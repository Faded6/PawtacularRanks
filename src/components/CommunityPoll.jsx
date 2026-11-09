import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Vote, Trophy, CheckCircle, Flame, Users, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';

const INITIAL_POLL = [
  { id: 'chihuahua', title: 'The 2-Pound Godzilla Chihuahua', animal: '🐶 Dogs', votes: 1420 },
  { id: 'squirrel', title: 'Parkour Squirrel Mission Impossible', animal: '🐿️ Wild', votes: 1180 },
  { id: 'husky', title: 'Opera Tantrum Drama Queen Husky', animal: '🐺 Huskies', votes: 1350 },
  { id: 'otter', title: 'Chaos Otter Synchronized Belly Slide', animal: '🦦 Otters', votes: 940 },
];

export default function CommunityPoll() {
  const [pollData, setPollData] = useState(() => {
    const saved = localStorage.getItem('pawtacular_poll_data');
    return saved ? JSON.parse(saved) : INITIAL_POLL;
  });

  const [votedId, setVotedId] = useState(() => {
    return localStorage.getItem('pawtacular_user_voted_id') || null;
  });

  const totalVotes = pollData.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = (id) => {
    if (votedId) return;

    playSound('fanfare');
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#f97316', '#10b981', '#ffffff']
    });

    const updated = pollData.map((item) => {
      if (item.id === id) {
        return { ...item, votes: item.votes + 1 };
      }
      return item;
    });

    setPollData(updated);
    setVotedId(id);
    localStorage.setItem('pawtacular_poll_data', JSON.stringify(updated));
    localStorage.setItem('pawtacular_user_voted_id', id);
  };

  return (
    <section id="poll" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Vote className="w-3.5 h-3.5" />
            <span>Community Showdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            Who Took Today’s Crown? 👑
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Cast your vote for the funniest animal of today’s episode. Winning animals get spotlighted in our weekly Hall of Fame!
          </p>
        </div>

        {/* Voting Box Container */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141724] to-[#0c0d14] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Header row in poll box */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-zinc-300 font-semibold">
              <Users className="w-4 h-4 text-amber-400" />
              <span>{totalVotes.toLocaleString()} Total Votes Recorded</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              ● Live Today
            </span>
          </div>

          {/* Poll Options */}
          <div className="py-6 space-y-3.5">
            {pollData.map((item) => {
              const percentage = Math.round((item.votes / totalVotes) * 100) || 0;
              const isSelected = votedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleVote(item.id)}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer group ${
                    votedId
                      ? isSelected
                        ? 'border-amber-400/80 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                        : 'border-white/5 bg-white/[0.02]'
                      : 'border-white/10 hover:border-amber-400/50 bg-white/5 hover:bg-white/10 hover:scale-[1.01]'
                  }`}
                >
                  {/* Fill bar when voted */}
                  {votedId && (
                    <div
                      className={`absolute top-0 bottom-0 left-0 transition-all duration-1000 rounded-2xl ${
                        isSelected 
                          ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 border-r-2 border-amber-400' 
                          : 'bg-white/5'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  )}

                  {/* Content inside bar */}
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-amber-400 bg-amber-500 text-black' 
                          : 'border-white/20 group-hover:border-amber-400'
                      }`}>
                        {isSelected ? <CheckCircle className="w-4 h-4 stroke-[3]" /> : null}
                      </div>

                      <div>
                        <div className="text-xs text-amber-400 font-semibold">{item.animal}</div>
                        <div className="text-sm sm:text-base font-extrabold text-white">
                          {item.title}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {votedId ? (
                        <div>
                          <div className="text-base sm:text-lg font-black text-amber-300 font-['Outfit']">
                            {percentage}%
                          </div>
                          <div className="text-[11px] text-zinc-400 font-medium">
                            {item.votes.toLocaleString()} votes
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-zinc-400 group-hover:text-amber-300 transition-colors">
                          Vote →
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Footer message */}
          <div className="pt-4 border-t border-white/10 text-center">
            {votedId ? (
              <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Your vote is locked in! Thanks for helping crown today’s #1.</span>
              </p>
            ) : (
              <p className="text-xs text-zinc-400">
                Click any animal to cast your vote. No sign-up required.
              </p>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

