import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../components/Footer';

describe('Footer', () => {
  // Test Case 9: Footer Component Renders Correctly
  it('should render the brand name and copyright information', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText('Null:Expected')).toBeInTheDocument();
    expect(screen.getByText(/© 2025 Null:Expected/i)).toBeInTheDocument();
    expect(screen.getByText(/always in beta, always improving/i)).toBeInTheDocument();
  });

  it('should render navigation sections', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Behind the Blog')).toBeInTheDocument();
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('should render footer navigation links', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByRole('link', { name: /qa processes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /our mission/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('should have proper brand logo', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const brandSection = screen.getByText('Null:Expected').closest('div');
    expect(brandSection).toBeInTheDocument();
  });
});