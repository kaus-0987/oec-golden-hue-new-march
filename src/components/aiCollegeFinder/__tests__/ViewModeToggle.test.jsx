import { render, screen, fireEvent } from '@testing-library/react';
import ViewModeToggle from '../ViewModeToggle';

describe('ViewModeToggle Component', () => {
  const mockOnViewModeChange = jest.fn();

  beforeEach(() => {
    mockOnViewModeChange.mockClear();
  });

  it('renders both grid and list buttons', () => {
    render(<ViewModeToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />);
    
    expect(screen.getByLabelText(/grid view/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/list view/i)).toBeInTheDocument();
  });

  it('highlights active view mode', () => {
    render(<ViewModeToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />);
    
    const gridButton = screen.getByLabelText(/grid view/i);
    expect(gridButton).toHaveClass('bg-white', 'text-white');
  });

  it('calls onViewModeChange when button is clicked', () => {
    render(<ViewModeToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />);
    
    const listButton = screen.getByLabelText(/list view/i);
    fireEvent.click(listButton);
    
    expect(mockOnViewModeChange).toHaveBeenCalledWith('list');
  });

  it('switches active state when view mode changes', () => {
    const { rerender } = render(
      <ViewModeToggle viewMode="grid" onViewModeChange={mockOnViewModeChange} />
    );
    
    let gridButton = screen.getByLabelText(/grid view/i);
    expect(gridButton).toHaveClass('bg-white');

    rerender(<ViewModeToggle viewMode="list" onViewModeChange={mockOnViewModeChange} />);
    
    const listButton = screen.getByLabelText(/list view/i);
    expect(listButton).toHaveClass('bg-white');
  });
});
