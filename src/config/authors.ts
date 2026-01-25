export interface Author {
  id: string;
  name: string;
  slug: string;
  initials: string;
  title: string;
  roleTitle: string;
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
    roleTitle: 'Founder and Editor-in-Chief',
    bio: 'Andreea Vitan writes from the seam where delivery meets assurance. With a background spanning hands-on software testing, QA management, and release management, she focuses on risk-based testing, release readiness signals, and the practical governance that keeps teams shipping without ritual and panic.',
    tag: '[ quality_mindset = true ]',
    imageUrl: '/null-expected-adevitan.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/adevitan',
    email: 'ade@nullexpected.com'
  },
  author2: {
    id: 'author2',
    name: 'Guest Authors',
    slug: 'guest',
    initials: 'GA',
    title: 'QA Practitioners & Industry Contributors',
    roleTitle: 'Guest Contributors',
    bio: 'Guest authors bring diverse perspectives from across the QA and software delivery landscape. We welcome practitioners, leads, and engineers who have stories worth sharing about testing, quality, and shipping software that matters.',
    tag: '[ guest_contributor = true ]',
    imageUrl: '/null_expected_quest_authors.jpg',
    linkedinUrl: undefined,
    email: 'guest@nullexpected.com'
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
