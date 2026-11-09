import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShortsGrid from './components/ShortsGrid';
import RankSimulator from './components/RankSimulator';
import CommunityPoll from './components/CommunityPoll';
import Soundboard from './components/Soundboard';
import FairUseSection from './components/FairUseSection';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import SubmitPetModal from './components/SubmitPetModal';
import { useShorts } from './hooks/useShorts';

export default function App() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const { shorts, isLoading, isLiveSynced, lastSyncTime, refresh } = useShorts();

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar onOpenSubmit={() => setIsSubmitOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero 
          latestVideo={shorts[0]}
          onPlayShort={(video) => setActiveVideo(video)}
          onOpenSubmit={() => setIsSubmitOpen(true)}
        />

        <ShortsGrid 
          shorts={shorts}
          isLoading={isLoading}
          isLiveSynced={isLiveSynced}
          lastSyncTime={lastSyncTime}
          onRefresh={refresh}
          onPlayShort={(video) => setActiveVideo(video)}
        />

        <RankSimulator />

        <CommunityPoll />

        <Soundboard />

        <FairUseSection 
          onOpenSubmit={() => setIsSubmitOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenSubmit={() => setIsSubmitOpen(true)} />

      {/* Video Shorts Modal Player */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        onOpenSubmit={() => setIsSubmitOpen(true)}
      />

      {/* Submit Pet Clip Modal */}
      <SubmitPetModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />

    </div>
  );
}
