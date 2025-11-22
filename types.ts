export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  author: string;
  uploadDate: string;
  rating: number; // Percentage
  category: string;
  description?: string;
}

export interface Category {
  name: string;
  count: number;
}

export enum VideoCategory {
  REACT = 'React',
  TYPESCRIPT = 'TypeScript',
  AI = 'AI & ML',
  DESIGN = 'UI Design',
  BACKEND = 'Backend',
  DEVOPS = 'DevOps'
}