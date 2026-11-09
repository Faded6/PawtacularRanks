import React, { useState } from 'react';
import { Volume2, Sparkles, Music, Play } from 'lucide-react';
import { playSound } from '../utils/audio';

const SOUNDS = [
  { id: 'bark', name: 'Playful Bark', icon: '🐶', label: 'Classic Woof', color: 'hover:border-amber-400' },
  { id: 'meow', name: 'Cheeky Meow', icon: '🐱', label: 'Dramatic Pitch', color: 'hover:border-orange-400' },
  { id: 'quack', name: 'Derpy Quack', icon: '🦆', label: 'Buzzy Waddle', color: 'hover:border-yellow-400' },
  { id: 'boing', name: 'Spring Boing', icon: '🐿️', label: 'Acrobatic Jump', color: 'hover:border-emerald-400' },
  { id: 'fail', name: 'Fail Wah-Wah', icon: '🎺', label: 'Sad Trombone', color: 'hover:border-red-400' },
  { id: 'fanfare', name: 'Rank #1 Fanfare', icon: '👑', label: 'Victory Chords', color: 'hover:border-yellow-300' },
];

export default function Soundboard() {
  const [activeSound, setActiveSound] = useState(null);

  const handlePlay = (id) => {
    setActiveSound(id);
    playSound(id);
    setTimeout(() => setActiveSound(null), 400);
  };

  return (
    <section id="soundboard" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Music className="w-3.5 h-3.5" />
            <span>Sound FX Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            Pawtacular Soundboard 🔊
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">
            Test the comedic sound effects used throughout our video editing and ranking countdowns!
          </p>
        </div>

        {/* Sound buttons grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SOUNDS.map((sound) => {
            const isPlaying = activeSound === sound.id;

            return (
              <button
                key={sound.id}
                onClick={() => handlePlay(sound.id)}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#141724] to-[#0c0d14] border border-white/10 ${sound.color} transition-all duration-200 flex flex-col items-center justify-center gap-2 text-center group active:scale-95 shadow-lg ${
                  isPlaying ? 'scale-95 border-amber-400 bg-amber-500/20 shadow-amber-500/30' : 'hover:-translate-y-1'
                }`}
              >
                <div className={`text-3xl sm:text-4xl transition-transform ${isPlaying ? 'scale-125 rotate-6' : 'group-hover:scale-110'}`}>
                  {sound.icon}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {sound.name}
                  </h4>
                  <p className="text-[10px] text-zinc-400">
                    {sound.label}
                  </p>
                </div>

                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
