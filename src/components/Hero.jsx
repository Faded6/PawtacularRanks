import React, { useState } from 'react';
import { Play, Sparkles, Trophy, PawPrint, Flame, ChevronRight, CheckCircle2 } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { CHANNEL_INFO, SHORTS_DATA } from '../data/videos';
import { playSound } from '../utils/audio';

export default function Hero({ latestVideo, onPlayShort, onOpenSubmit }) {
  const featuredVideo = latestVideo || SHORTS_DATA[0];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[400px] h-[350px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide shadow-inner shadow-amber-500/10 animate-fade-in">
              <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>OFFICIAL YOUTUBE CHANNEL • NEW EPISODE DAILY</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-['Outfit']">
              Ranking The{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy decoration-2">
                Funniest Animals
              </span>{' '}
              On The Internet <span className="inline-block hover:scale-125 transition-transform duration-200">🐾</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Every day we curate the most chaotic pets, derpiest dogs, dramatic huskies, and acrobatic wild legends into honest, laugh-out-loud <span className="text-white font-semibold">Top 5 Countdowns</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  playSound('boing');
                  onPlayShort(featuredVideo);
                }}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                </div>
                <span>Watch Latest Top 5</span>
              </button>

              <button
                onClick={() => {
                  playSound('meow');
                  onOpenSubmit();
                }}
                className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm sm:text-base border border-white/15 hover:border-amber-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md"
              >
                <PawPrint className="w-4 h-4 text-amber-400" />
                <span>Submit Your Pet</span>
              </button>

              <a
                href={CHANNEL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('fanfare')}
                className="px-4 py-4 rounded-2xl bg-red-600/10 hover:bg-red-600/20 text-red-400 font-bold text-sm border border-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-2"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">Channel Page</span>
              </a>
            </div>

            {/* Highlights Bar */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <div className="text-xl font-black text-amber-400 font-['Outfit']">Daily</div>
                <div className="text-xs text-zinc-400">Fresh Countdowns</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <div className="text-xl font-black text-white font-['Outfit']">Top 5</div>
                <div className="text-xs text-zinc-400">Curated Moments</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <div className="text-xl font-black text-amber-400 font-['Outfit']">10+</div>
                <div className="text-xs text-zinc-400">Animal Species</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                <div className="text-xl font-black text-white font-['Outfit']">100%</div>
                <div className="text-xs text-zinc-400">Wholesome Laughs</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Frame Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              className="relative w-full max-w-[340px] sm:max-w-[370px] group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Outer ambient glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500" />

              {/* Vertical Phone Mockup Body */}
              <div className="relative rounded-3xl p-3.5 bg-gradient-to-b from-[#1c1f2b] to-[#0c0e14] border-2 border-white/15 shadow-2xl overflow-hidden">
                
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-black/60 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-8 h-1 bg-zinc-700 rounded-full" />
                </div>

                {/* Video Preview Card */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer"
                  onClick={() => {
                    playSound('boing');
                    onPlayShort(featuredVideo);
                  }}
                >
                  {/* YouTube Thumbnail image */}
                  <img 
                    src={`https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

                  {/* Top Bar inside Video */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-black text-[11px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Trophy className="w-3 h-3 fill-black" />
                      <span>Rank #1 Winner</span>
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
                      Shorts
                    </span>
                  </div>

                  {/* Center Play Button with ripple */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-xl shadow-amber-500/50 group-hover:scale-110 transition-all duration-300">
                      <Play className="w-7 h-7 fill-black ml-1 text-black" />
                    </div>
                  </div>

                  {/* Bottom Video Meta info */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-400">🐶 Featured Drop</span>
                      <span className="text-zinc-500 text-[10px]">•</span>
                      <span className="text-[11px] text-zinc-300">5 Unhinged Contenders</span>
                    </div>
                    <p className="text-xs font-extrabold text-white line-clamp-1">
                      {featuredVideo.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
                      <span>Click to preview countdown</span>
                      <span className="text-amber-400 font-bold">Watch Now →</span>
                    </div>
                  </div>
                </div>

                {/* Floating Rank Badge Left */}
                <div className="absolute -left-5 top-28 bg-[#181a24]/95 border border-amber-500/40 rounded-2xl p-2.5 shadow-xl backdrop-blur-xl flex items-center gap-2.5 animate-pulse">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-black text-sm">
                    #1
                  </div>
                  <div className="text-left pr-2">
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase">Daily Crown</p>
                    <p className="text-xs font-bold text-white max-w-[120px] truncate">{featuredVideo.featuredRank1 || 'Today\'s Winner'}</p>
                  </div>
                </div>

                {/* Floating Badge Right */}
                <div className="absolute -right-5 bottom-24 bg-[#181a24]/95 border border-white/15 rounded-2xl p-2.5 shadow-xl backdrop-blur-xl flex items-center gap-2">
                  <PawPrint className="w-5 h-5 text-amber-400" />
                  <div className="text-left pr-1">
                    <p className="text-xs font-extrabold text-amber-300">100% Real Clips</p>
                    <p className="text-[10px] text-zinc-400">Owner-Credited</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
