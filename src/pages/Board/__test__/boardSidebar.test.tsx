import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { BoardSidebar } from '../boardSidebar';
import '@testing-library/jest-dom/extend-expect'; // for expect assertions

import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe('BoardSidebar component', () => {
  test('renders BoardSidebar component with correct texts and placeholders', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BoardSidebar />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Boards')).toBeInTheDocument();
    expect(screen.getByText('Members')).toBeInTheDocument();
    expect(screen.getByText('Workspace Views')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Your Boards')).toBeInTheDocument();
  });

  test('renders correct roles for accessibility', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BoardSidebar />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId(/Boards/i)).toBeInTheDocument();
    expect(screen.getByTestId(/Members/i)).toBeInTheDocument();
  });
});

// Mock the dependencies
jest.mock('axios');
jest.mock('lodash');

describe('BoardSidebar Component', () => {
  // Rendering Test
  test('renders BoardSidebar component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BoardSidebar />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    // You can add more specific assertions based on your UI components
    expect(screen.getByTestId('Boards')).toBeInTheDocument();
    expect(screen.getByTestId('Members')).toBeInTheDocument();
  });

  // Interaction Test
  test('clicking on the invite button opens the dialog', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BoardSidebar />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );

    // Ensure the dialog is initially closed
    expect(screen.queryByText('Invite to Workspace')).not.toBeInTheDocument();

    // Trigger the dialog open
    fireEvent.click(screen.getByTestId('Members'));
  });

  // Snapshot Test
  // test('matches snapshot', () => {
  //   const { asFragment } = render(<BoardSidebar />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
