export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  date: string;
  slug: string;
  author: string; // Author name that maps to AUTHORS config
  content: string;
  category?: string; // Derived from first tag for display
}