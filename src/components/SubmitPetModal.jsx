import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Send, PawPrint, CheckCircle2, Copy, Sparkles, AlertCircle } from 'lucide-react';
import { CHANNEL_INFO } from '../data/videos';
import { playSound } from '../utils/audio';

export default function SubmitPetModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    petName: '',
    animalType: '',
    description: '',
    videoUrl: '',
    creditName: '',
    contactEmail: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.petName || !formData.videoUrl) return;

    playSound('fanfare');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ffffff']
    });

    setSubmitted(true);

    // Prepare mailto link
    const subject = encodeURIComponent(`🐾 Pet Clip Submission: ${formData.petName} (${formData.animalType || 'Pet'})`);
    const body = encodeURIComponent(
`Hi Pawtacular Ranks team!

Here is my funny pet clip submission for your daily countdown:

🐾 Pet Name: ${formData.petName}
🐾 Animal / Breed: ${formData.animalType || 'N/A'}
🎥 Video Link: ${formData.videoUrl}
📝 What Happened: ${formData.description || 'Watch the video!'}
🏷️ Desired Credit / Handle: ${formData.creditName || 'Anonymous'}
📩 Contact Email: ${formData.contactEmail || 'N/A'}

I give permission for this clip to be featured in a Pawtacular Ranks countdown with credit!`
    );

    window.open(`mailto:${CHANNEL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CHANNEL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#181b28] to-[#0d0f17] border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-['Outfit']">
                Submit Your Pet To Be Ranked
              </h3>
              <p className="text-xs text-zinc-400">
                Get your furry comedian featured in a daily Top 5 episode!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-white font-['Outfit']">
              Clip Submitted Successfully! 🎉
            </h4>
            <p className="text-zinc-300 text-sm max-w-md mx-auto">
              Your default email client opened with all details pre-formatted for <strong className="text-amber-400">{CHANNEL_INFO.email}</strong>.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/10 flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4 text-amber-400" />
                <span>{copied ? 'Email Copied!' : `Copy ${CHANNEL_INFO.email}`}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black shadow-lg shadow-amber-500/20"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Pet's Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barnaby, Luna, Peanut"
                  value={formData.petName}
                  onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Animal / Breed
                </label>
                <input
                  type="text"
                  placeholder="e.g. Golden Retriever, Orange Cat"
                  value={formData.animalType}
                  onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                Video Link (YouTube, TikTok, Drive, Dropbox, iCloud) *
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                What Hilarious Thing Did They Do?
              </label>
              <textarea
                rows={3}
                placeholder="Describe the funny fail or moment..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Desired Credit Name / Handle
                </label>
                <input
                  type="text"
                  placeholder="@yourhandle or Name"
                  value={formData.creditName}
                  onChange={(e) => setFormData({ ...formData, creditName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                  Your Contact Email
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Fair Use Reminder */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-400 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                By submitting, you confirm you have the right to share this clip and agree to Pawtacular Ranks featuring it with clear attribution.
              </span>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-102"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Channel</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
