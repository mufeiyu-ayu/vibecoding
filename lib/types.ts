export interface BlogPost {
  id: string;
  title: string;
  category: string;
  tags: string[];
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface LifestyleMoment {
  id: string;
  type: 'image' | 'checkin' | 'music' | 'thought';
  content: string;
  caption: string;
  location?: string;
  date: string;
  tags: string[];
  color: string;
}

export type ViewState = 'intro' | 'blog' | 'about' | 'lifestyle';
