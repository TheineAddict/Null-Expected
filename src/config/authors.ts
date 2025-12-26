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
    title: 'QA & Release Manager',
    bio: 'Andreea Vitan is a Release & Test Manager with over twelve years of experience driving high-quality software delivery across complex platforms. She focuses on defining test strategy, improving processes, and leading releases with clear governance, risk management, and stakeholder alignment. Passionate about agile delivery and quality culture, she brings structure, clarity, and ownership to every project.',
    tag: '[ quality_mindset = true ]',
    imageUrl: '/andreea%20vitan%20qa%20delivery%20manager.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/adevitan',
    email: 'ade@nullexpected.com'
  },
  author2: {
    id: 'author2',
    name: 'Martin Adler',
    slug: 'martinadler',
    initials: 'MA',
    title: 'Test Architect & QA Engineer',
    bio: 'Martin Adler writes about software quality, delivery risk, and the organisational rituals that quietly replace evidence. His work focuses on practical decision-making in modern product teams—where constraints are real, certainty is rare, and shipping still happens.',
    tag: '[ process_optimizer = true ]',
    //imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    imageUrl: '/martin%20adler%20null%20expected.jpg',

    linkedinUrl: 'https://www.linkedin.com/in/adevitan',
    email: 'martin@nullexpected.com'
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
