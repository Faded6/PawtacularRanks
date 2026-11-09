import React from 'react';
import { PawPrint, Heart, ArrowUp, Mail, Send } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { CHANNEL_INFO } from '../data/videos';
import { playSound } from '../utils/audio';

export default function Footer({ onOpenSubmit }) {
  const scrollToTop = () => {
    playSound('boing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#07080c] py-14 relative overflow-hidden">
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logo.png" 
                alt="Pawtacular Ranks" 
                className="w-10 h-10 rounded-xl border border-amber-500/30 object-cover"
              />
              <span className="text-xl font-extrabold text-white font-['Outfit']">
                Pawtacular <span className="text-amber-400">Ranks</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The official hub for Pawtacular Ranks. Ranking the funniest, most unhinged, and delightfully chaotic pets & wild animals every single day.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={CHANNEL_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-600/20 text-zinc-300 hover:text-red-400 border border-white/10 transition-colors"
                title="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href={`mailto:${CHANNEL_INFO.email}`}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-400 border border-white/10 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Daily Drop Countdown</a>
              </li>
              <li>
                <a href="#shorts" className="hover:text-amber-400 transition-colors">All YouTube Shorts</a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-amber-400 transition-colors">Countdown Simulator</a>
              </li>
              <li>
                <a href="#poll" className="hover:text-amber-400 transition-colors">Vote for Today's #1</a>
              </li>
              <li>
                <a href="#soundboard" className="hover:text-amber-400 transition-colors">Sound FX Lab</a>
              </li>
            </ul>
          </div>

          {/* Community & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Get Involved
            </h4>
            <p className="text-xs text-zinc-400">
              Have a funny video of your pet? Send it in to be featured in the next Top 5!
            </p>

            <div className="pt-1 flex flex-col gap-2">
              <button
                onClick={onOpenSubmit}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Your Pet Clip</span>
              </button>

              <a
                href={CHANNEL_INFO.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500 fill-current" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Pawtacular Ranks. Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline mx-0.5" />
            <span>for animal lovers worldwide.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
