export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  slug: string;
  author: 'Jane Smith' | 'Alex Davis';
  content: string;
  category?: string; // Derived from first tag for display
}