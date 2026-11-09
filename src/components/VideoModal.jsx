import React, { useEffect } from 'react';
import { X, ExternalLink, Trophy, Send, Sparkles } from 'lucide-react';
import YoutubeIcon from './YoutubeIcon';
import { playSound } from '../utils/audio';

export default function VideoModal({ video, onClose, onOpenSubmit }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#171a26] to-[#0c0e14] border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Pawtacular Shorts Player
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="relative bg-black flex-1 flex items-center justify-center p-2">
          <div className="w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Meta Bar */}
        <div className="p-5 border-t border-white/10 space-y-3 bg-[#0c0e14]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-white font-['Outfit']">
                {video.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {video.description}
              </p>
            </div>
          </div>

          {/* Quick Action row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <a
              href={`https://www.youtube.com/shorts/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all"
            >
              <YoutubeIcon className="w-4 h-4 fill-white" />
              <span>Comment on YouTube</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenSubmit();
              }}
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Submit A Clip</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
