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
    name: 'Ade Vitan 2',
    slug: 'adevitan2',
    initials: 'AV',
    title: 'Release Manager',
    bio: 'With 12 years of experience in QA and release management, Ade has worked across financial software platforms, leading large-scale migrations and building efficient, streamlined release strategies. Formerly a QA Manager, she brings a strong focus on embedding quality early, fostering team alignment, and balancing agility with risk-based decision making. Ade is passionate about quality culture, pragmatic processes, and helping QA professionals grow their careers. Outside of work, she blends her love of tech, writing, and creativity through projects like Null Expected.',
    tag: '[ quality_mindset = true ]',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQEOv7QBIbhwjA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723039271624?e=1759363200&v=beta&t=fNqH3lggh-LVs-TpVJSbsYEX_lwOaFvDcQwcqTJT9gI',
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
    linkedinUrl: '#',
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