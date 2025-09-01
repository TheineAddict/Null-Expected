import { describe, it, expect } from 'vitest';
import { getAuthorBySlug, getAuthorByName, getAllAuthors, AUTHORS } from '../../config/authors';

describe('authors config', () => {
  // Test Case 5: getAuthorBySlug Utility Function
  describe('getAuthorBySlug', () => {
    it('should retrieve an author by their slug', () => {
      const author = getAuthorBySlug('adevitan');
      expect(author).toBeDefined();
      expect(author?.name).toBe('Ade Vitan');
      expect(author?.slug).toBe('adevitan');
      expect(author?.imageUrl).toBeDefined();
      expect(author?.imageUrl).toContain('http'); // Should be a valid URL
    });

    it('should retrieve Alex Davis by slug', () => {
      const author = getAuthorBySlug('alexdavis');
      expect(author).toBeDefined();
      expect(author?.name).toBe('Alex Davis');
      expect(author?.slug).toBe('alexdavis');
    });

    it('should return undefined for a non-existent author slug', () => {
      const author = getAuthorBySlug('non-existent-author');
      expect(author).toBeUndefined();
    });
  });

  describe('getAuthorByName', () => {
    it('should retrieve an author by their name', () => {
      const author = getAuthorByName('Ade Vitan');
      expect(author).toBeDefined();
      expect(author?.slug).toBe('adevitan');
    });

    it('should return undefined for non-existent name', () => {
      const author = getAuthorByName('Non Existent Author');
      expect(author).toBeUndefined();
    });
  });

  describe('getAllAuthors', () => {
    it('should return all configured authors', () => {
      const authors = getAllAuthors();
      expect(authors).toHaveLength(2);
      expect(authors.map(a => a.name)).toContain('Ade Vitan');
      expect(authors.map(a => a.name)).toContain('Alex Davis');
    });
  });

  describe('AUTHORS configuration', () => {
    it('should have valid author configurations', () => {
      expect(AUTHORS.author1.name).toBe('Ade Vitan');
      expect(AUTHORS.author1.slug).toBe('adevitan');
      expect(AUTHORS.author1.imageUrl).toBeDefined();
      
      expect(AUTHORS.author2.name).toBe('Alex Davis');
      expect(AUTHORS.author2.slug).toBe('alexdavis');
      expect(AUTHORS.author2.imageUrl).toBeDefined();
    });
  });
});