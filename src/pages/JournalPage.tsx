import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, User, Tag } from 'lucide-react';
import { SiteConfig } from '../types/retreat';

interface JournalPageProps {
  config: SiteConfig;
  onOpenBooking: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({ config, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const articles = [
    {
      id: 1,
      title: 'The Science of 432Hz: How Sound Healing Restores the Nervous System',
      category: 'Sound Healing',
      readTime: '6 min read',
      author: 'Anmol Khatti',
      date: 'October 12, 2026',
      summary: 'Explore the biophysical mechanisms through which Tibetan singing bowls and gong harmonics bring brainwaves from high-stress beta states down into theta and delta stillness.',
      image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&w=1200&q=80',
      tag: 'Vibrational Therapy'
    },
    {
      id: 2,
      title: 'Pranayama in the Pines: Awakening Vital Life Force Through Mountain Air',
      category: 'Yoga & Breath',
      readTime: '5 min read',
      author: 'Komal Makhetra',
      date: 'October 04, 2026',
      summary: 'Why practicing Nadi Shodhana and Kapalabhati at dawn surrounded by pine forest elevates oxygen saturation and balances the left and right hemispheres of the brain.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      tag: 'Breathwork'
    },
    {
      id: 3,
      title: 'The Sattvic Kitchen: Why Pure Vegetarian Food Changes Your Meditation',
      category: 'Nourishment',
      readTime: '8 min read',
      author: 'Anmol Khatti',
      date: 'September 28, 2026',
      summary: 'According to Ayurveda, the purity of mind (Sattva) begins on your plate. Learn why eliminating heavy spices and processed food opens pathways for deep introspection.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      tag: 'Ayurveda'
    },
    {
      id: 4,
      title: 'Solo Travel as a Spiritual Mirror: Finding Freedom Beyond Social Roles',
      category: 'Inner Alignment',
      readTime: '7 min read',
      author: 'Komal Makhetra',
      date: 'September 19, 2026',
      summary: 'Over 60% of Shunya Sync guests arrive alone. Here is how entering a circle of strangers allows you to shed masks and discover authentic self-acceptance.',
      image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
      tag: 'Self Growth'
    }
  ];

  const categories = ['All', 'Sound Healing', 'Yoga & Breath', 'Nourishment', 'Inner Alignment'];

  const filtered = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="py-12 sm:py-20 px-5 sm:px-8 max-w-7xl mx-auto space-y-16 animate-section-flip">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EFE9] text-[#C67856] text-xs font-semibold uppercase tracking-[0.2em] border border-[#E9D9CF]">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Wisdom &amp; Practice</span>
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1F2E23]">
          The Shunya Sync Journal
        </h1>
        <p className="text-base sm:text-lg text-[#556057] font-light">
          Reflections on sound alchemy, yogic sadhana, and grounding back into conscious presence.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              selectedCategory === cat
                ? 'bg-[#1F2E23] text-white shadow-md'
                : 'bg-white text-[#4A574C] hover:bg-[#F0ECE1] border border-[#DFD7CA]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#DFD7CA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col card-3d-tilt"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1F2E23]/80 backdrop-blur-md text-white text-[11px] font-medium tracking-wide">
                {article.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C67856]" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C67856]" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#C67856]" />
                    {article.author}
                  </span>
                </div>

                <h2 className="font-serif-display text-2xl font-bold text-[#1F2E23] hover:text-[#C67856] transition leading-snug">
                  {article.title}
                </h2>

                <p className="text-sm text-[#556057] leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2E23]">
                  <Tag className="w-3.5 h-3.5 text-[#C67856]" />
                  <span>{article.tag}</span>
                </span>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-[#C67856] hover:text-[#B56745]"
                >
                  <span>Experience Live</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter / Circle Invitation */}
      <div className="rounded-3xl bg-[#1F2E23] text-white p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-2xl border border-[#3E5242] card-3d-tilt">
        <h3 className="font-serif-display text-3xl font-normal text-stone-100">
          Receive Sacred Reflections Directly
        </h3>
        <p className="text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
          Join our monthly sanctuary journal for seasonal Ayurvedic recipes, sound frequencies, and private invitations to future cohorts led by Anmol &amp; Komal.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C67856]"
          />
          <button
            onClick={() => alert('Thank you for subscribing to Shunya Sync Reflections!')}
            className="px-6 py-3 rounded-full bg-[#C67856] hover:bg-[#B56745] text-white text-xs uppercase tracking-widest font-semibold transition"
          >
            Join Circle
          </button>
        </div>
      </div>
    </div>
  );
};
