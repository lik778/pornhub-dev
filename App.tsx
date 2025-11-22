import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { VideoGrid } from './components/VideoGrid';
import { VideoPlayer } from './components/VideoPlayer';
import { Video } from './types';

const App: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogoClick = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white flex flex-col font-sans">
      <Header onToggleSidebar={toggleSidebar} onLogoClick={handleLogoClick} />
      
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-0 md:ml-0'}`}>
          <div className="max-w-[1600px] mx-auto">
            {selectedVideo ? (
              <VideoPlayer video={selectedVideo} onBack={() => setSelectedVideo(null)} />
            ) : (
              <VideoGrid onVideoSelect={setSelectedVideo} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;