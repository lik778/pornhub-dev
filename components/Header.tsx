import React, { useState } from 'react';
import { Menu, Search, Upload, Video, Zap, X, Loader2 } from 'lucide-react';
import { generateVideoIdeas } from '../services/geminiService';

interface HeaderProps {
  onToggleSidebar: () => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onLogoClick }) => {
  const [isIdeaModalOpen, setIsIdeaModalOpen] = useState(false);
  const [ideaTopic, setIdeaTopic] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateIdeas = async () => {
    if (!ideaTopic.trim()) return;
    setLoading(true);
    const ideas = await generateVideoIdeas(ideaTopic);
    setGeneratedIdeas(ideas);
    setLoading(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-brand-gray border-b border-[#333] z-50 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="text-white hover:text-brand-orange transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={onLogoClick}
          >
            <span className="bg-white text-black font-bold px-1 rounded-l-sm text-xl h-8 flex items-center">Dev</span>
            <span className="bg-brand-orange text-black font-bold px-1 rounded-r-sm text-xl h-8 flex items-center">Hub</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white hover:border-b-2 border-brand-orange py-5 transition-all">Home</a>
            <a href="#" className="hover:text-white hover:border-b-2 border-brand-orange py-5 transition-all">Top Rated</a>
            <a href="#" className="hover:text-white hover:border-b-2 border-brand-orange py-5 transition-all">Community</a>
            <button 
              onClick={() => setIsIdeaModalOpen(true)}
              className="text-brand-orange flex items-center gap-1 hover:text-white transition-colors"
            >
              <Zap size={16} />
              <span>AI Ideas</span>
            </button>
          </nav>
        </div>

        <div className="flex-1 max-w-xl mx-8 hidden md:flex relative">
          <input 
            type="text" 
            placeholder="Search videos..." 
            className="w-full bg-black border border-[#333] text-white px-4 py-2 pr-10 focus:outline-none focus:border-brand-orange transition-colors"
          />
          <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white bg-[#333] border-l border-[#333]">
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white">
            <Upload size={18} />
            <span>Upload</span>
          </button>
          <button className="bg-brand-orange hover:bg-[#e68a00] text-black text-sm font-bold px-4 py-1.5 rounded-sm transition-colors flex items-center gap-2">
            <span className="hidden sm:inline">Premium</span>
            <span className="sm:hidden">UP</span>
          </button>
          <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" />
          </div>
        </div>
      </header>

      {/* AI Idea Generator Modal */}
      {isIdeaModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
          <div className="bg-[#1b1b1b] w-full max-w-md rounded-sm border border-[#333] shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-[#333]">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Zap size={20} className="text-brand-orange" />
                AI Content Generator
              </h3>
              <button onClick={() => setIsIdeaModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-400 mb-4">Need inspiration? Let Gemini generate viral coding video titles for you.</p>
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={ideaTopic}
                  onChange={(e) => setIdeaTopic(e.target.value)}
                  placeholder="Enter a topic (e.g., React Hooks)"
                  className="flex-1 bg-black border border-[#333] text-white px-3 py-2 focus:border-brand-orange outline-none text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateIdeas()}
                />
                <button 
                  onClick={handleGenerateIdeas}
                  disabled={loading}
                  className="bg-brand-orange text-black font-bold px-4 py-2 text-sm hover:bg-[#e68a00] disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Generate'}
                </button>
              </div>
              
              {generatedIdeas.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Suggestions</h4>
                  {generatedIdeas.map((idea, idx) => (
                    <div key={idx} className="p-2 bg-black border border-[#333] text-sm text-gray-200 hover:border-brand-orange cursor-pointer">
                      {idea}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};