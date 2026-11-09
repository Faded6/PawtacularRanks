import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ChevronLeft, ChevronRight, Sparkles, Volume2, Flame, Award, RotateCcw } from 'lucide-react';
import { RANK_SIMULATOR_STEPS } from '../data/videos';
import { playSound } from '../utils/audio';

export default function RankSimulator() {
  const [currentRankIdx, setCurrentRankIdx] = useState(0); // 0 is Rank 5, 4 is Rank 1
  const step = RANK_SIMULATOR_STEPS[currentRankIdx];

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#f97316', '#ffffff']
    });
  };

  const handleSelectRank = (idx) => {
    setCurrentRankIdx(idx);
    const targetStep = RANK_SIMULATOR_STEPS[idx];
    playSound(targetStep.sound);
    if (idx === 4) {
      triggerConfetti();
    }
  };

  const handleNext = () => {
    if (currentRankIdx < RANK_SIMULATOR_STEPS.length - 1) {
      handleSelectRank(currentRankIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentRankIdx > 0) {
      handleSelectRank(currentRankIdx - 1);
    }
  };

  return (
    <section id="simulator" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            How A Pawtacular Countdown Works ⏱️
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            We don’t just throw random animal clips together. Every rank has a role, build-up, and story. Step through the countdown below to experience the formula!
          </p>
        </div>

        {/* Simulator Card Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141724] to-[#0c0d14] border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Stepper Tabs Bar (Rank 5 to Rank 1) */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-8">
            {RANK_SIMULATOR_STEPS.map((s, idx) => {
              const isActive = idx === currentRankIdx;
              const isPast = idx < currentRankIdx;
              const isRank1 = idx === 4;

              return (
                <button
                  key={s.rank}
                  onClick={() => handleSelectRank(idx)}
                  className={`relative py-3 sm:py-4 px-2 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-1 group ${
                    isActive
                      ? isRank1
                        ? 'bg-gradient-to-b from-yellow-400 to-amber-600 text-black border-yellow-300 shadow-xl shadow-amber-500/30 scale-105'
                        : 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/20 scale-102'
                      : isPast
                        ? 'bg-white/5 border-white/20 text-zinc-300 hover:border-amber-500/40'
                        : 'bg-white/[0.02] border-white/5 text-zinc-500 hover:border-white/20'
                  }`}
                >
                  <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                    isActive && isRank1 ? 'text-black/80' : isActive ? 'text-amber-400' : 'text-zinc-400'
                  }`}>
                    {isRank1 ? '👑 #1' : `Rank`}
                  </span>
                  <span className="text-base sm:text-xl font-black font-['Outfit']">
                    #{s.rank}
                  </span>

                  {isActive && (
                    <div className="absolute -bottom-1.5 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Rank Content Card */}
          <div className="bg-[#0e1019]/90 border border-white/10 rounded-2xl p-6 sm:p-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r ${step.badgeColor} text-white shadow-md`}>
                    Rank #{step.rank}
                  </span>
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    {step.highlight}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] pt-1">
                  {step.subtitle}
                </h3>
              </div>

              {/* Sound Effect Button */}
              <button
                onClick={() => {
                  playSound(step.sound);
                  if (currentRankIdx === 4) triggerConfetti();
                }}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-200 text-xs font-bold flex items-center gap-2 hover:border-amber-400/50 transition-all self-stretch md:self-auto justify-center"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Play Rank Sound SFX</span>
              </button>
            </div>

            {/* Main Stage Description */}
            <div className="py-6 space-y-4">
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {step.description}
              </p>

              {/* Highlight callout */}
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-3 text-sm text-amber-300">
                <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span>
                  {step.rank === 1
                    ? "🏆 The Holy Grail: Selected by community reaction, timing, and pure laugh-out-loud shock value."
                    : `Why it sits at #${step.rank}: Sets the bar high and keeps the audience hooked for the final reveal.`}
                </span>
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={handlePrev}
                disabled={currentRankIdx === 0}
                className="px-4 py-2.5 rounded-xl bg-white/5 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Rank</span>
              </button>

              <div className="text-xs text-zinc-500 font-medium">
                Step {currentRankIdx + 1} of 5
              </div>

              {currentRankIdx === 4 ? (
                <button
                  onClick={() => handleSelectRank(0)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Countdown</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>Next Rank</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

