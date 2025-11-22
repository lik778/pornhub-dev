import React, { useEffect, useState } from 'react';
import { Video } from '../types';
import { ThumbsUp, ThumbsDown, Share2, Download, Flag, MessageSquare, Sparkles, Check } from 'lucide-react';
import { explainCodeTopic } from '../services/geminiService';
import { VideoGrid } from './VideoGrid';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBack }) => {
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    // Reset state when video changes
    setAiExplanation('');
    setIsLoadingAi(false);
    // Scroll to top
    window.scrollTo(0, 0);
  }, [video]);

  const handleAskAI = async () => {
    setIsLoadingAi(true);
    const text = await explainCodeTopic(video.title);
    setAiExplanation(text);
    setIsLoadingAi(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Video Player Placeholder */}
          <div className="w-full aspect-video bg-black relative group border border-[#333] shadow-2xl">
            <img 
                src={video.thumbnail} 
                className="w-full h-full object-cover opacity-50" 
                alt="Video background" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-4 border-white/80 flex items-center justify-center pl-2 cursor-pointer hover:scale-110 hover:bg-brand-orange hover:border-brand-orange hover:text-black transition-all group-hover:border-brand-orange">
                    <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-current border-b-[15px] border-b-transparent"></div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#333] cursor-pointer group-hover:h-2 transition-all">
                <div className="w-1/3 h-full bg-brand-orange relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
            </div>
          </div>

          {/* Video Title & Actions */}
          <div className="mt-4">
            <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#333] pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${video.author}/100/100`} alt={video.author} />
                    </div>
                    <div>
                        <div className="font-bold text-white hover:text-brand-orange cursor-pointer">{video.author}</div>
                        <div className="text-xs text-gray-400">250K Subscribers</div>
                    </div>
                    <button className="bg-brand-orange hover:bg-[#e68a00] text-black text-xs font-bold px-3 py-1.5 rounded-sm ml-2 uppercase">
                        Subscribe
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#1b1b1b] rounded-sm overflow-hidden">
                        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#333] text-sm font-medium">
                            <ThumbsUp size={16} />
                            <span>{video.rating}%</span>
                        </button>
                        <div className="w-[1px] h-4 bg-[#333]"></div>
                        <button className="flex items-center px-3 py-1.5 hover:bg-[#333] text-sm font-medium">
                            <ThumbsDown size={16} />
                        </button>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#1b1b1b] rounded-sm text-sm font-medium">
                        <Share2 size={16} />
                        <span className="hidden sm:inline">Share</span>
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#1b1b1b] rounded-sm text-sm font-medium">
                        <Download size={16} />
                        <span className="hidden sm:inline">Save</span>
                    </button>
                    <button className="px-2 py-1.5 hover:bg-[#1b1b1b] rounded-sm">
                        <Flag size={16} />
                    </button>
                </div>
            </div>

            {/* Info & AI Section */}
            <div className="mt-4 bg-[#1b1b1b] p-4 rounded-sm border border-[#333]">
                <div className="flex items-start gap-2 mb-2 text-sm text-gray-400">
                    <span>{video.views} views</span>
                    <span>•</span>
                    <span>{video.uploadDate}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                   In this comprehensive tutorial, we dive deep into {video.category}. Perfect for developers looking to level up their skills. 
                   Follow along as we build real-world projects and explore advanced concepts.
                </p>

                {/* AI Feature */}
                <div className="mt-6 border-t border-[#333] pt-4">
                    {!aiExplanation ? (
                        <button 
                            onClick={handleAskAI}
                            disabled={isLoadingAi}
                            className="flex items-center gap-2 text-brand-orange hover:text-white transition-colors text-sm font-bold"
                        >
                            <Sparkles size={16} />
                            {isLoadingAi ? 'Analyzing Video Context...' : 'Ask AI: What is this video about?'}
                        </button>
                    ) : (
                        <div className="bg-[#0f0f0f] border border-brand-orange/30 p-3 rounded-sm animate-pulse-once">
                            <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase mb-1">
                                <Sparkles size={12} />
                                Gemini AI Summary
                            </div>
                            <p className="text-sm text-gray-200 italic">"{aiExplanation}"</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Comments Section Preview */}
            <div className="mt-8">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <MessageSquare size={18} />
                    2,450 Comments
                </h3>
                <div className="space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 bg-purple-900 rounded-full flex-shrink-0 text-xs flex items-center justify-center font-bold">U{i}</div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white">User_{i}</span>
                                    <span className="text-[10px] text-gray-500">2 hours ago</span>
                                </div>
                                <p className="text-sm text-gray-300 mt-1">This tutorial saved my life! The part about {video.category} was explained so clearly. Great job!</p>
                                <div className="flex items-center gap-3 mt-2 text-gray-500 text-xs">
                                    <button className="flex items-center gap-1 hover:text-white"><ThumbsUp size={12} /> 124</button>
                                    <button className="flex items-center gap-1 hover:text-white"><ThumbsDown size={12} /></button>
                                    <button className="hover:text-white">Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar Recommendations (Reuse Grid logic but vertical) */}
        <div className="w-full lg:w-[350px] flex-shrink-0">
            <h3 className="font-bold mb-4 text-gray-300 uppercase text-xs tracking-wider">Up Next</h3>
            <div className="flex flex-col gap-3">
                <div className="p-4 bg-[#1b1b1b] text-center text-sm text-gray-400 border border-[#333] rounded-sm">
                    Mock Related Videos List
                </div>
                {/* In a real app, we would map actual related videos here using a smaller card component */}
                <button onClick={onBack} className="text-brand-orange hover:underline text-sm mt-4">
                    &larr; Back to Home
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};