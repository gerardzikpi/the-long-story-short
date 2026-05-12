export interface Post {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
  author: string;
  imageUrl?: string;
}

export type Page = 'home' | 'detail' | 'admin' | 'about';
