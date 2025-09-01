import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AuthorBlog from './AuthorBlog';
import { AUTHORS } from '../config/authors';
import { BlogPost } from '../types/blog';

// Mock the blogUtils module
vi.mock('../utils/blogUtils', () => ({
  loadBlogPosts: vi.fn(),
  getPostsByAuthorSlug: vi.fn(),
}));

// Import the mocked functions
import { loadBlogPosts, getPostsByAuthorSlug } from '../utils/blogUtils';

describe('AuthorBlog', () => {
  const mockAllPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Post by Ade',
      excerpt: 'Excerpt 1',
      tags: ['qa-processes'],
      readTime: '5 min read',
      date: '2024-01-01',
      slug: 'post-by-ade',
      author: AUTHORS.author1.name,
      content: '<p>Content 1</p>',
      category: 'QA Processes',
    },
    {
      id: 2,
      title: 'Another Post by Ade',
      excerpt: 'Excerpt 2',
      tags: ['quality-mindset'],
      readTime: '7 min read',
      date: '2024-01-02',
      slug: 'another-post-by-ade',
      author: AUTHORS.author1.name,
      content: '<p>Content 2</p>',
      category: 'Quality Mindset',
    },
    {
      id: 3,
      title: 'Post by Alex',
      excerpt: 'Excerpt 3',
      tags: ['career-advice'],
      readTime: '10 min read',
      date: '2024-01-03',
      slug: 'post-by-alex',
      author: AUTHORS.author2.name,
      content: '<p>Content 3</p>',
      category: 'Career Advice',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(loadBlogPosts).mockResolvedValue(mockAllPosts);
  });

  // Test Case 10: AuthorBlog Page Renders for Valid Author
  it('should render author details and their posts for a valid author slug', async () => {
    const adesPosts = mockAllPosts.filter(post => post.author === AUTHORS.author1.name);
    vi.mocked(getPostsByAuthorSlug).mockReturnValue(adesPosts);

    render(
      <MemoryRouter initialEntries={[`/blog/author/${AUTHORS.author1.slug}`]}>
        <Routes>
          <Route path="/blog/author/:authorSlug" element={<AuthorBlog />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(AUTHORS.author1.name)).toBeInTheDocument();
      expect(screen.getByText(AUTHORS.author1.title)).toBeInTheDocument();
      expect(screen.getByText(AUTHORS.author1.bio)).toBeInTheDocument();
      expect(screen.getByText('Post by Ade')).toBeInTheDocument();
      expect(screen.getByText('Another Post by Ade')).toBeInTheDocument();
      expect(screen.queryByText('Post by Alex')).not.toBeInTheDocument();
    });
  });

  it('should display "Author Not Found" for an invalid author slug', async () => {
    render(
      <MemoryRouter initialEntries={['/blog/author/non-existent-author']}>
        <Routes>
          <Route path="/blog/author/:authorSlug" element={<AuthorBlog />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Author Not Found')).toBeInTheDocument();
      expect(screen.getByText(/The author you're looking for doesn't exist./i)).toBeInTheDocument();
    });
  });

  it('should display "No posts by this author yet" if author has no posts', async () => {
    vi.mocked(getPostsByAuthorSlug).mockReturnValue([]);

    render(
      <MemoryRouter initialEntries={[`/blog/author/${AUTHORS.author2.slug}`]}>
        <Routes>
          <Route path="/blog/author/:authorSlug" element={<AuthorBlog />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(AUTHORS.author2.name)).toBeInTheDocument();
      expect(screen.getByText(/No posts by this author yet./i)).toBeInTheDocument();
    });
  });

  it('should display correct post count in author header', async () => {
    const adesPosts = mockAllPosts.filter(post => post.author === AUTHORS.author1.name);
    vi.mocked(getPostsByAuthorSlug).mockReturnValue(adesPosts);

    render(
      <MemoryRouter initialEntries={[`/blog/author/${AUTHORS.author1.slug}`]}>
        <Routes>
          <Route path="/blog/author/:authorSlug" element={<AuthorBlog />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/posts_by_author: 2/i)).toBeInTheDocument();
    });
  });
});