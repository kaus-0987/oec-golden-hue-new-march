import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    itemsPerPage: 10,
    onPageChange: mockOnPageChange,
  };

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders pagination information correctly', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText(/Showing 1 to 10 of 50 courses/i)).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    
    const prevButton = screen.getByLabelText(/previous page/i);
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    
    const nextButton = screen.getByLabelText(/next page/i);
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when page number is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    
    const nextButton = screen.getByLabelText(/next page/i);
    fireEvent.click(nextButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('highlights current page', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-gradient-to-r from-yellow-500 via-amber-700 to-yellow-900', 'text-white');
  });
});
