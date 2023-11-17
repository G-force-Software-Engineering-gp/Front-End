import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import BoardHeader from '../boardHeader';

const queryClient = new QueryClient();

describe('BoardHeader Component', () => {
  test('renders BoardHeader component correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <BoardHeader />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    waitFor(() => {
      expect(screen.getByText('G-Force')).toBeInTheDocument();
      expect(screen.getByText('Board')).toBeInTheDocument();
    });
  });

  test('renders buttons and icons', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <BoardHeader />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId(/eye/i)).toBeInTheDocument();
    expect(screen.getByTestId(/star/i)).toBeInTheDocument();
    expect(screen.getByTestId(/trello/i)).toBeInTheDocument();
    expect(screen.getByTestId(/list filter/i)).toBeInTheDocument();
  });

  test('renders popover content on Trello button click', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <BoardHeader />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('See your work in new ways')).not.toBeInTheDocument();
    });

    const trelloButton = screen.getByTestId(/trello/i);
    userEvent.click(trelloButton);

    // await waitFor(() => {
    waitFor(() => {
      expect(screen.queryByText('See your work in new ways')).toBeInTheDocument();
    });
  });
});
