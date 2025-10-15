export interface Author {
  id: string;
  name: string;
  slug: string;
  initials: string;
  title: string;
  bio: string;
  tag: string;
  imageUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
}

export const AUTHORS: Record<string, Author> = {
  author1: {
    id: 'author1',
    name: 'Andreea Vitan',
    slug: 'andreeavitan',
    initials: 'AV',
    title: 'Release Manager',
    bio: 'With 12 years in QA and release management, Andreea focuses on early quality, team alignment, and pragmatic processes. She shares her passion for quality and tech creativity through Null Expected.',
    tag: '[ quality_mindset = true ]',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D35AQGK4xHxitT8Yg/profile-framedphoto-shrink_400_400/B4DZlwVGqTJIAc-/0/1758526204867?e=1761040800&v=beta&t=wpEk-9bE8jLPul1Q9XC5Neg8uWJIxqz0XFUcQ-aQ2Ss',
    linkedinUrl: 'https://www.linkedin.com/in/adevitan',
    email: 'ade@nullexpected.com'
  },
  author2: {
    id: 'author2',
    name: 'Alex Davis',
    slug: 'alexdavis',
    initials: 'AD',
    title: 'QA Lead & Strategy Consultant',
    bio: 'Alex brings 10+ years of experience in quality strategy and team leadership. He\'s worked across startups and enterprise organizations, focusing on quality culture transformation and process optimization. Alex is known for his pragmatic approach to QA and his ability to translate technical concepts into business value.',
    tag: '[ process_optimizer = true ]',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    linkedinUrl: 'https://www.linkedin.com/in/adevitan',
    email: 'alex@nullexpected.com'
  }
};

// Generate URL-friendly slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '') // Remove spaces
    .trim();
}

// Helper functions
export const getAuthorById = (id: string): Author | undefined => {
  return AUTHORS[id];
};

export const getAuthorByName = (name: string): Author | undefined => {
  return Object.values(AUTHORS).find(author => author.name === name);
};

export const getAllAuthors = (): Author[] => {
  return Object.values(AUTHORS);
};

export const getAuthorBySlug = (slug: string): Author | undefined => {
  return Object.values(AUTHORS).find(author => author.slug === slug);
};

// For backward compatibility with existing blog posts
export const getAuthorInfo = (authorName: string): Author => {
  const author = getAuthorByName(authorName);
  if (author) {
    return author;
  }
  
  // Fallback to first author if not found
  return AUTHORS.author1;
};