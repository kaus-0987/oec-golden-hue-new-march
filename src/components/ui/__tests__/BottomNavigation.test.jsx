import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import BottomNavigation from '../BottomNavigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('BottomNavigation Component', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
  });

  it('renders all navigation items', () => {
    render(<BottomNavigation />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Course Finder')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('FAQs')).toBeInTheDocument();
  });

  it('highlights active page', () => {
    usePathname.mockReturnValue('/ai-college-finder');
    render(<BottomNavigation />);
    
    const courseFinderLink = screen.getByText('Course Finder').closest('a');
    expect(courseFinderLink).toHaveClass('text-amber-900');
  });

  it('renders correct links', () => {
    render(<BottomNavigation />);
    
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Course Finder').closest('a')).toHaveAttribute('href', '/ai-college-finder');
    expect(screen.getByText('Events').closest('a')).toHaveAttribute('href', '/events');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact-us');
    expect(screen.getByText('FAQs').closest('a')).toHaveAttribute('href', '/faqs');
  });

  it('shows aria-current for active page', () => {
    usePathname.mockReturnValue('/');
    render(<BottomNavigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('is hidden on desktop (md breakpoint)', () => {
    const { container } = render(<BottomNavigation />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('md:hidden');
  });

  it('renders all navigation icons', () => {
    const { container } = render(<BottomNavigation />);
    
    // Should have 5 icons (one for each nav item)
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(5);
  });

  it('matches different route patterns correctly', () => {
    usePathname.mockReturnValue('/events/some-event');
    render(<BottomNavigation />);
    
    const eventsLink = screen.getByText('Events').closest('a');
    expect(eventsLink).toHaveClass('text-amber-900');
  });
});
