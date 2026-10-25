import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Serve static files from Vite build output
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));

  // Client-side SPA routing fallback
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
} else {
  app.get('*', (_req, res) => {
    res.status(200).send('Server is running. Please run npm run build to generate the dist directory.');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Shunya Sync server listening on port ${PORT}`);
});
