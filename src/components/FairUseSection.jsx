import React from 'react';
import { ShieldCheck, Mail, Copyright, Sparkles, HeartHandshake } from 'lucide-react';
import { CHANNEL_INFO } from '../data/videos';
import { playSound } from '../utils/audio';

export default function FairUseSection({ onOpenSubmit }) {
  return (
    <section id="policy" className="py-20 relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#171a26] via-[#10131d] to-[#171a26] border border-white/10 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Creator Rights & Fair Use Policy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                100% Respect for Creators & Clip Owners 🐾
              </h2>

              <p className="text-zinc-300 text-sm leading-relaxed">
                At <strong>Pawtacular Ranks</strong>, all clips belong to their respective creators and owners. Our countdowns transform user-submitted and viral comedic moments into edited, structured, transformative rankings with original voice casting, commentary, and comedic timing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Prompt credit additions on request</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Fast, no-hassle clip removal</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Pet submission licensing & attribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Direct contact with human editors</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="md:col-span-4 bg-[#0a0b10] border border-white/10 rounded-2xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">
                  Get In Touch
                </h4>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Credit, removal requests, or brand partnerships:
                </p>
                <a 
                  href={`mailto:${CHANNEL_INFO.email}`}
                  onClick={() => playSound('meow')}
                  className="block mt-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 break-all transition-colors underline decoration-dotted"
                >
                  {CHANNEL_INFO.email}
                </a>
              </div>

              <button
                onClick={onOpenSubmit}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
              >
                Submit A Clip Instead
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
