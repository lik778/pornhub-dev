import React from 'react';
import { VideoCategory } from '../types';
import { Home, Star, Users, Clock, History, ThumbsUp, Settings, Hash } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-60 bg-[#1b1b1b] border-r border-[#333] overflow-y-auto z-40 pb-4 hidden md:block">
      <div className="p-4">
        <button className="w-full bg-brand-orange text-black font-bold py-2 mb-6 rounded-sm hover:bg-[#e68a00] transition-colors uppercase text-sm tracking-wide">
          Join Premium
        </button>

        <div className="space-y-1 mb-8">
          <SidebarItem icon={<Home size={18} />} label="Home" active />
          <SidebarItem icon={<Star size={18} />} label="Top Rated" />
          <SidebarItem icon={<Users size={18} />} label="Community" />
          <SidebarItem icon={<Clock size={18} />} label="Watch Later" />
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase px-3 mb-3 tracking-wider">Categories</h3>
        <div className="space-y-1 mb-8">
          {Object.values(VideoCategory).map((category) => (
            <SidebarItem key={category} icon={<Hash size={16} />} label={category} />
          ))}
        </div>

        <h3 className="text-xs font-bold text-gray-500 uppercase px-3 mb-3 tracking-wider">User</h3>
        <div className="space-y-1">
          <SidebarItem icon={<History size={18} />} label="History" />
          <SidebarItem icon={<ThumbsUp size={18} />} label="Liked Videos" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </div>
    </aside>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <a 
    href="#" 
    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors ${
      active 
        ? 'bg-[#333] text-white border-l-4 border-brand-orange pl-2' 
        : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);