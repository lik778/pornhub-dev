import React, { useEffect, useState } from 'react';
import { Video, VideoCategory } from '../types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  onVideoSelect: (video: Video) => void;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Build a Netflix Clone with React & Tailwind',
    thumbnail: 'https://picsum.photos/seed/react1/640/360',
    duration: '45:20',
    views: '1.2M',
    author: 'CodeMaster',
    uploadDate: '2 days ago',
    rating: 98,
    category: VideoCategory.REACT
  },
  {
    id: '2',
    title: 'TypeScript Generics Explained Simply',
    thumbnail: 'https://picsum.photos/seed/ts2/640/360',
    duration: '12:05',
    views: '850K',
    author: 'TypeWizard',
    uploadDate: '1 week ago',
    rating: 95,
    category: VideoCategory.TYPESCRIPT
  },
  {
    id: '3',
    title: 'Advanced CSS Grid & Flexbox Layouts',
    thumbnail: 'https://picsum.photos/seed/css3/640/360',
    duration: '28:15',
    views: '2.4M',
    author: 'DesignPro',
    uploadDate: '3 days ago',
    rating: 99,
    category: VideoCategory.DESIGN
  },
  {
    id: '4',
    title: 'Deploying Docker Containers to AWS',
    thumbnail: 'https://picsum.photos/seed/devops4/640/360',
    duration: '55:00',
    views: '500K',
    author: 'CloudNinja',
    uploadDate: '5 hours ago',
    rating: 92,
    category: VideoCategory.DEVOPS
  },
  {
    id: '5',
    title: 'Understanding Neural Networks from Scratch',
    thumbnail: 'https://picsum.photos/seed/ai5/640/360',
    duration: '1:15:30',
    views: '3.1M',
    author: 'AI_Explorer',
    uploadDate: '1 month ago',
    rating: 97,
    category: VideoCategory.AI
  },
  {
    id: '6',
    title: 'The Ultimate Guide to React Hooks',
    thumbnail: 'https://picsum.photos/seed/hooks6/640/360',
    duration: '32:45',
    views: '900K',
    author: 'ReactGuru',
    uploadDate: '2 weeks ago',
    rating: 96,
    category: VideoCategory.REACT
  },
  {
    id: '7',
    title: 'Rust vs Go: Which One Should You Learn?',
    thumbnail: 'https://picsum.photos/seed/rust7/640/360',
    duration: '18:20',
    views: '1.5M',
    author: 'SysDev',
    uploadDate: '4 days ago',
    rating: 94,
    category: VideoCategory.BACKEND
  },
  {
    id: '8',
    title: 'Figma to React: Complete Workflow',
    thumbnail: 'https://picsum.photos/seed/figma8/640/360',
    duration: '42:10',
    views: '600K',
    author: 'FrontendFlow',
    uploadDate: '1 day ago',
    rating: 93,
    category: VideoCategory.DESIGN
  }
];

export const VideoGrid: React.FC<VideoGridProps> = ({ onVideoSelect }) => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Simulate loading
    setVideos(MOCK_VIDEOS);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-brand-orange rounded-full"></span>
          Recommended Videos
        </h2>
        <div className="flex gap-2 text-sm">
          <button className="text-brand-orange font-bold hover:underline">Most Recent</button>
          <span className="text-gray-600">|</span>
          <button className="text-gray-400 hover:text-white">Most Viewed</button>
          <span className="text-gray-600">|</span>
          <button className="text-gray-400 hover:text-white">Top Rated</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={() => onVideoSelect(video)} />
        ))}
      </div>

      <div className="mt-12 text-center">
         <button className="border border-[#333] text-gray-400 hover:text-white hover:border-white px-6 py-2 text-sm font-medium rounded-sm transition-all">
            Show More Videos
         </button>
      </div>
    </div>
  );
};