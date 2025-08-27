export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'QA Processes' | 'Quality Mindset' | 'Career Advice' | 'Industry Trends' | 'Tools & Tech' | 'Case Studies';
  readTime: string;
  date: string;
  slug: string;
  author: 'Jane Smith' | 'Alex Davis';
  content: string;
}