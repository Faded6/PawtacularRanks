import React, { useState, useEffect } from 'react';
import { PawPrint, Volume2, Sparkles, Send, Menu, X } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { CHANNEL_INFO } from '../data/videos';
import { playSound } from '../utils/audio';

export default function Navbar({ onOpenSubmit }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    playSound('bark');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#090a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-amber-500/5 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <a 
            href="#hero" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-amber-500/40 p-0.5 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 shadow-lg shadow-amber-500/20">
                <img 
                  src="/assets/logo.png" 
                  alt="Pawtacular Ranks Logo" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090a0f] rounded-full animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent group-hover:to-amber-400 transition-colors">
                  Pawtacular
                </span>
                <span className="text-xl font-extrabold text-amber-400">Ranks</span>
                <PawPrint className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
                Daily Funny Animal Top 5s
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#shorts" 
              className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Top Shorts
            </a>
            <a 
              href="#simulator" 
              className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <span>Rank Simulator</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                Interactive
              </span>
            </a>
            <a 
              href="#poll" 
              className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Daily Vote
            </a>
            <a 
              href="#soundboard" 
              className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Soundboard
            </a>
            <a 
              href="#policy" 
              className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors"
            >
              Creators & Credit
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                playSound('meow');
                onOpenSubmit();
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/10 hover:border-amber-500/40 transition-all duration-200 flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Submit Pet</span>
            </button>

            <a
              href={CHANNEL_INFO.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('fanfare')}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <YoutubeIcon className="w-4 h-4 fill-white" />
              <span>Subscribe</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-300 hover:text-white bg-white/5 border border-white/10"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e1017]/95 backdrop-blur-2xl border-b border-white/10 px-5 pt-3 pb-6 mt-3 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <a 
              href="#shorts" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-200 hover:text-amber-400 py-1"
            >
              Top Shorts
            </a>
            <a 
              href="#simulator" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-200 hover:text-amber-400 py-1 flex items-center justify-between"
            >
              <span>Rank Simulator</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Interactive</span>
            </a>
            <a 
              href="#poll" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-200 hover:text-amber-400 py-1"
            >
              Daily Vote
            </a>
            <a 
              href="#soundboard" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-200 hover:text-amber-400 py-1"
            >
              Soundboard
            </a>
            <a 
              href="#policy" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-zinc-200 hover:text-amber-400 py-1"
            >
              Creators & Credit
            </a>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmit();
              }}
              className="w-full py-3 rounded-xl text-sm font-bold bg-white/10 text-white flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>Submit Your Pet Clip</span>
            </button>
            <a
              href={CHANNEL_INFO.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-sm font-bold bg-red-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              <YoutubeIcon className="w-5 h-5 fill-white" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
