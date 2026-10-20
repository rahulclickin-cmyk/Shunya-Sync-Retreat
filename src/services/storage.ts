import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getStoredSupabaseConfig } from './supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  path?: string;
  bucket?: string;
  error?: string;
}

export interface BucketStatus {
  exists: boolean;
  isPublic: boolean;
  error?: string;
}

export const DEFAULT_STORAGE_BUCKET = 'retreat-media';

/**
 * Checks if Supabase credentials have been entered and stored.
 */
export function isSupabaseStorageAvailable(): boolean {
  const cfg = getStoredSupabaseConfig();
  return Boolean(cfg.supabaseUrl && cfg.supabaseAnonKey && cfg.supabaseUrl.trim() !== '' && cfg.supabaseAnonKey.trim() !== '');
}

/**
 * Returns an initialized Supabase client using stored credentials.
 */
export function getStorageClient(): SupabaseClient | null {
  const cfg = getStoredSupabaseConfig();
  if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
    try {
      return createClient(cfg.supabaseUrl.trim(), cfg.supabaseAnonKey.trim());
    } catch (err) {
      console.error('Failed to initialize Supabase client for storage:', err);
      return null;
    }
  }
  return null;
}

/**
 * Sanitizes a file name for safe storage keys in S3/Supabase Storage.
 */
export function sanitizeFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Uploads a browser File object to Supabase Storage.
 * Generates a public CDN URL upon completion.
 */
export async function uploadImageToSupabase(
  file: File,
  options?: {
    bucket?: string;
    folder?: 'hero' | 'founders' | 'gallery' | 'general' | 'media';
    customName?: string;
  }
): Promise<UploadResult> {
  const client = getStorageClient();
  const storedCfg = getStoredSupabaseConfig();
  const bucket = options?.bucket || storedCfg.storageBucket || DEFAULT_STORAGE_BUCKET;
  const folder = options?.folder || 'general';

  if (!client) {
    return {
      success: false,
      error: 'Supabase credentials are not configured. Please enter your Supabase Project URL and Anon Key in the Supabase tab.'
    };
  }

  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: `Invalid file type "${file.type}". Please upload an image (JPEG, PNG, WebP, etc.).`
      };
    }

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return {
        success: false,
        error: 'File size exceeds 10MB limit. Please compress the image before uploading.'
      };
    }

    const timestamp = Date.now();
    const cleanName = sanitizeFileName(options?.customName || file.name);
    const filePath = `${folder}/${timestamp}_${cleanName}`;

    // Upload to Supabase Storage
    const { data, error } = await client.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return {
        success: false,
        error: `Supabase Storage error: ${error.message}. Ensure the bucket "${bucket}" exists and is marked as Public.`
      };
    }

    // Retrieve public CDN URL
    const { data: publicData } = client.storage.from(bucket).getPublicUrl(data.path);

    if (!publicData || !publicData.publicUrl) {
      return {
        success: false,
        error: 'Uploaded successfully, but failed to retrieve public URL.'
      };
    }

    return {
      success: true,
      url: publicData.publicUrl,
      path: data.path,
      bucket
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Unexpected storage upload error:', message);
    return {
      success: false,
      error: `Upload exception: ${message}`
    };
  }
}

/**
 * Converts a Base64 / Data URL to a Blob/File and uploads to Supabase Storage.
 */
export async function uploadBase64ImageToSupabase(
  dataUrl: string,
  fileName: string,
  options?: {
    bucket?: string;
    folder?: 'hero' | 'founders' | 'gallery' | 'general';
  }
): Promise<UploadResult> {
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) {
      return { success: false, error: 'Invalid data URL format.' };
    }

    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const blob = new Blob([u8arr], { type: mime });
    const file = new File([blob], fileName, { type: mime });

    return await uploadImageToSupabase(file, options);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: `Failed to process base64 data: ${message}`
    };
  }
}

/**
 * Attempts to verify if a storage bucket exists and is public.
 */
export async function checkStorageBucket(bucketName = DEFAULT_STORAGE_BUCKET): Promise<BucketStatus> {
  const client = getStorageClient();
  if (!client) {
    return { exists: false, isPublic: false, error: 'Supabase client not initialized' };
  }

  try {
    const { data, error } = await client.storage.getBucket(bucketName);
    if (error) {
      return { exists: false, isPublic: false, error: error.message };
    }
    return {
      exists: true,
      isPublic: Boolean(data?.public)
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { exists: false, isPublic: false, error: msg };
  }
}

/**
 * Tries to create the bucket if it does not exist yet.
 */
export async function ensureStorageBucket(bucketName = DEFAULT_STORAGE_BUCKET): Promise<{ success: boolean; message: string }> {
  const client = getStorageClient();
  if (!client) {
    return { success: false, message: 'Supabase client not configured.' };
  }

  try {
    const status = await checkStorageBucket(bucketName);
    if (status.exists) {
      return { success: true, message: `Storage bucket "${bucketName}" exists and is ready.` };
    }

    const { error } = await client.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 10485760 // 10MB
    });

    if (error) {
      return {
        success: false,
        message: `Could not auto-create bucket: ${error.message}. Please create bucket "${bucketName}" manually in Supabase Storage or run the provided SQL.`
      };
    }

    return {
      success: true,
      message: `Successfully created public bucket "${bucketName}" in Supabase!`
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Bucket creation error: ${msg}` };
  }
}

/**
 * Deletes an image file from Supabase Storage by its path.
 */
export async function deleteImageFromSupabase(
  filePath: string,
  bucketName = DEFAULT_STORAGE_BUCKET
): Promise<{ success: boolean; error?: string }> {
  const client = getStorageClient();
  if (!client) {
    return { success: false, error: 'Supabase client not initialized.' };
  }

  try {
    const { error } = await client.storage.from(bucketName).remove([filePath]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg };
  }
}

/**
 * SQL snippet specifically to configure Supabase Storage bucket and RLS policies.
 */
export const SUPABASE_STORAGE_SQL_SETUP = `-- ==============================================================
-- SHUNYA SYNC RETREAT - SUPABASE STORAGE BUCKET & ACCESS POLICIES
-- Run this in your Supabase Dashboard -> SQL Editor
-- ==============================================================

-- 1. Create the 'retreat-media' bucket with public access
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'retreat-media',
  'retreat-media',
  true,
  10485760, -- 10 Megabytes max file size
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Policy: Allow public read access to all images
DROP POLICY IF EXISTS "Public Read Access on retreat-media" ON storage.objects;
CREATE POLICY "Public Read Access on retreat-media"
ON storage.objects FOR SELECT
USING (bucket_id = 'retreat-media');

-- 3. Policy: Allow uploads into retreat-media bucket
DROP POLICY IF EXISTS "Allow Uploads on retreat-media" ON storage.objects;
CREATE POLICY "Allow Uploads on retreat-media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'retreat-media');

-- 4. Policy: Allow updates and deletes
DROP POLICY IF EXISTS "Allow Updates on retreat-media" ON storage.objects;
CREATE POLICY "Allow Updates on retreat-media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'retreat-media');

DROP POLICY IF EXISTS "Allow Deletes on retreat-media" ON storage.objects;
CREATE POLICY "Allow Deletes on retreat-media"
ON storage.objects FOR DELETE
USING (bucket_id = 'retreat-media');
`;
