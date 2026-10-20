import React, { useState, useMemo } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, User, Tag, X, Share2, Check } from 'lucide-react';
import { SiteConfig, BlogPost } from '../types/retreat';
import { DEFAULT_BLOG_POSTS } from '../services/supabase';

interface JournalPageProps {
  config: SiteConfig;
  onOpenBooking: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ config, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Use dynamic blog posts from config, with fallback to DEFAULT_BLOG_POSTS
  const articles: BlogPost[] = useMemo(() => {
    if (config.blogPosts && config.blogPosts.length > 0) {
      return config.blogPosts.filter((p) => p.published !== false);
    }
    return DEFAULT_BLOG_POSTS;
  }, [config.blogPosts]);

  // Extract categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return Array.from(set);
  }, [articles]);

  const filtered = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-section-flip">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5EEDB] text-[#B38728] text-xs font-semibold uppercase tracking-[0.2em] border border-[#D4AF37]/30">
          <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Wisdom &amp; Practice</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1A120B]">
          The Shunya Sync Journal
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light leading-relaxed">
          Reflections on 432Hz sound alchemy, Himalayan yogic sadhana, Sattvic nutrition, and returning to the zero-point of inner stillness.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#1A120B] font-bold shadow-md'
                : 'bg-white text-stone-600 hover:bg-[#F5EEDB] hover:text-[#1A120B] border border-[#DFD7CA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filtered.map((article) => (
          <article
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="group bg-white rounded-3xl overflow-hidden border border-[#DFD7CA] hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer card-3d-tilt"
          >
            <div>
              {/* Image Container with Gold Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#1A120B]/80 backdrop-blur-md text-[#E5C158] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  {article.category}
                </div>
                {article.tag && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#1A120B] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    #{article.tag}
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B38728]" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#B38728]" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F2E23] group-hover:text-[#B38728] transition-colors leading-snug">
                  {article.title}
                </h2>

                <p className="text-sm text-[#5B665D] line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            {/* Card Footer with Author and Read Button */}
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex items-center justify-between border-t border-[#F2ECE3] text-xs font-semibold text-[#1F2E23]">
              <span className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F5EEDB] text-[#B38728] flex items-center justify-center border border-[#D4AF37]/40">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-stone-700">{article.author}</span>
              </span>

              <span className="text-[#B38728] group-hover:translate-x-1 transition-transform flex items-center gap-1.5 font-bold">
                Read Article
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-[#FAF7F0] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#D4AF37]/40 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full overflow-hidden rounded-t-3xl bg-stone-900">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/40 to-transparent" />

              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition shadow-lg cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#D4AF37] text-[#1A120B] shadow-sm mb-2">
                  {activeArticle.category}
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {activeArticle.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-10 space-y-6">
              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5DFD5] text-xs text-stone-500">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#1A120B] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B38728]" />
                    {activeArticle.author}
                  </span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                <button
                  onClick={() => handleShare(activeArticle)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 hover:border-[#D4AF37] text-stone-700 hover:text-[#B38728] transition"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>

              {/* Main formatted article content */}
              <div className="text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-light">
                {activeArticle.content || activeArticle.summary}
              </div>

              {/* Bottom Card for Retreat Booking */}
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1A120B] to-[#2B1F16] text-white border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif-display text-xl font-bold text-[#E5C158]">
                    Experience These Practices in Person
                  </h4>
                  <p className="text-xs text-stone-300">
                    Join our intimate 10–14 seeker cohorts in the Himalayan nature sanctuaries.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticle(null);
                    onOpenBooking();
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-[#1A120B] font-bold text-xs uppercase tracking-widest hover:brightness-110 transition shadow-lg shrink-0 cursor-pointer"
                >
                  Reserve Your Suite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
