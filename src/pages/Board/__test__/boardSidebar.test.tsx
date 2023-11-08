import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BoardSidebar } from '../boardSidebar';

describe('BoardSidebar component', () => {
  test('renders BoardSidebar component with correct texts and placeholders', () => {
    render(<BoardSidebar />);

    expect(screen.getByText('G-Force')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Boards')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Workspace Views')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Your Boards')).toBeInTheDocument();
  });

  test('renders correct roles for accessibility', () => {
    render(<BoardSidebar />);

    expect(screen.getByTestId(/Boards/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Members/i)).toBeInTheDocument();

  });
});
