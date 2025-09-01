export interface Author {
  id: string;
  name: string;
  initials: string;
  title: string;
  bio: string;
  tag: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
}

export const AUTHORS: Record<string, Author> = {
  author1: {
    id: 'author1',
    name: 'Jane Smith',
    initials: 'JS',
    title: 'Senior QA Engineer',
    bio: 'With over 8 years in QA, Jane specializes in test automation frameworks and performance testing. She\'s passionate about building scalable testing strategies and mentoring junior QA professionals. When she\'s not debugging test flakes, you\'ll find her exploring new testing tools or speaking at QA conferences.',
    tag: '[ automation_enthusiast = true ]',
    linkedinUrl: '#',
    email: 'jane@nullexpected.com'
  },
  author2: {
    id: 'author2',
    name: 'Alex Davis',
    initials: 'AD',
    title: 'QA Lead & Strategy Consultant',
    bio: 'Alex brings 10+ years of experience in quality strategy and team leadership. He\'s worked across startups and enterprise organizations, focusing on quality culture transformation and process optimization. Alex is known for his pragmatic approach to QA and his ability to translate technical concepts into business value.',
    tag: '[ process_optimizer = true ]',
    linkedinUrl: '#',
    email: 'alex@nullexpected.com'
  }
};

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

// For backward compatibility with existing blog posts
export const getAuthorInfo = (authorName: string): Author => {
  const author = getAuthorByName(authorName);
  if (author) {
    return author;
  }
  
  // Fallback to first author if not found
  return AUTHORS.author1;
};