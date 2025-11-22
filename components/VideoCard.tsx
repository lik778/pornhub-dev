import React from 'react';
import { Video } from '../types';
import { ThumbsUp, Eye } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div className="group cursor-pointer flex flex-col gap-2" onClick={onClick}>
      <div className="relative aspect-video bg-[#222] overflow-hidden rounded-sm">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded-sm border border-black">
          {video.duration}
        </div>
        
        {/* HD Badge */}
        <div className="absolute top-1 left-1 bg-transparent">
          <span className="bg-brand-orange text-black text-[10px] font-bold px-1 rounded-sm">HD</span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-white text-sm font-bold leading-tight group-hover:text-brand-orange transition-colors line-clamp-2">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <span>{video.author}</span>
            <span className="flex items-center gap-1">
                <Eye size={12} />
                {video.views}
            </span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-400 bg-[#1b1b1b] p-1.5 rounded-sm mt-1">
           <div className="flex items-center gap-1 text-brand-orange">
              <ThumbsUp size={12} />
              <span className="font-bold">{video.rating}%</span>
           </div>
           <span>{video.uploadDate}</span>
        </div>
      </div>
    </div>
  );
};