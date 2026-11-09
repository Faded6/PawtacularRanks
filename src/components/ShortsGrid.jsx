import React, { useState } from 'react';
import { Play, ExternalLink, Filter, Sparkles, Trophy, PawPrint, Search } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { SHORTS_DATA, CHANNEL_INFO } from '../data/videos';
import { playSound } from '../utils/audio';

const CATEGORIES = [
  { id: 'all', label: 'All Countdowns' },
  { id: 'dogs', label: '🐶 Dogs & Puppies' },
  { id: 'wild', label: '🐿️ Wild & Farm' },
  { id: 'aquatic', label: '🦦 Otters & Water' },
  { id: 'birds', label: '🦆 Ducks & Birds' },
];

export default function ShortsGrid({ onPlayShort }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShorts = SHORTS_DATA.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="shorts" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <YoutubeIcon className="w-3.5 h-3.5 fill-current" />
              <span>Official Shorts Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
              Explore Every Countdown 🎬
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-1">
              Select any episode to watch the complete ranking, find out who took #1, and join the debate!
            </p>
          </div>

          <a
            href={CHANNEL_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View all on YouTube Channel</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Filters & Search Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  playSound('boing');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search animals, breeds..."
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 focus:border-amber-500/50 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none transition-all"
            />
          </div>

        </div>

        {/* Video Cards Grid */}
        {filteredShorts.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-3xl p-8">
            <PawPrint className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No countdowns found</h3>
            <p className="text-xs text-zinc-500 mt-1">Try clearing your search query or choosing another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShorts.map((video) => (
              <div
                key={video.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#13151f] to-[#0c0e14] border border-white/10 hover:border-amber-500/40 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
              >
                {/* 9:16 Vertical Thumbnail Card */}
                <div 
                  className="relative aspect-[9/14] sm:aspect-[9/15] rounded-xl overflow-hidden bg-black cursor-pointer"
                  onClick={() => {
                    playSound('boing');
                    onPlayShort(video);
                  }}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 group-hover:via-black/10 transition-colors" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-black text-[10px] font-black uppercase tracking-wider shadow">
                      {video.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                      Top 5
                    </span>
                  </div>

                  {/* Play Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-black flex items-center justify-center shadow-xl shadow-amber-500/40 group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black ml-0.5 text-black" />
                    </div>
                  </div>

                  {/* Bottom Preview Pill */}
                  <div className="absolute bottom-2.5 inset-x-2.5 p-2 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between text-[10px]">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      <span>{video.featuredRank1}</span>
                    </span>
                    <span className="text-zinc-400 font-medium">Rank #1</span>
                  </div>
                </div>

                {/* Details under thumbnail */}
                <div className="pt-3.5 px-1 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                      <span className="text-amber-400 font-semibold">{video.categoryName}</span>
                      <span>{video.views}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2 font-['Outfit']">
                      {video.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-normal">
                      {video.description}
                    </p>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        playSound('boing');
                        onPlayShort(video);
                      }}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 hover:border-amber-400/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
                      <span>Play Here</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/shorts/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 hover:border-red-500/40 transition-colors"
                      title="Open on YouTube Shorts"
                    >
                      <YoutubeIcon className="w-4 h-4 fill-current" />
                    </a>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
