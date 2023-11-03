import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import BoardHeader from '../boardHeader';
import userEvent from '@testing-library/user-event';

describe('BoardHeader Component', () => {
  test('renders BoardHeader component correctly', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <BoardHeader />
        </AuthProvider >
      </MemoryRouter>
    );

    // Check if the component renders without crashing
    expect(screen.getByText('G-Force')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
  });

  test('renders buttons and icons', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <BoardHeader />
        </AuthProvider>
      </MemoryRouter>
    );

    // Check if specific buttons and icons are present
    expect(screen.getByTestId(/eye/i)).toBeInTheDocument();
    expect(screen.getByTestId(/star/i)).toBeInTheDocument();
    expect(screen.getByTestId(/trello/i)).toBeInTheDocument();
    expect(screen.getByTestId(/list filter/i)).toBeInTheDocument();
  });

  test('renders popover content on Trello button click', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <BoardHeader />
        </AuthProvider >
      </MemoryRouter>
    );

    // Check if popover content is hidden initially
    await waitFor(() => {
      expect(screen.queryByText('See your work in new ways')).not.toBeInTheDocument();
    });

    // Click Trello button to open popover
    const trelloButton = screen.getByTestId(/trello/i);
    userEvent.click(trelloButton);

    // Check if popover content is displayed after clicking the Trello button
    await waitFor(() => {
      expect(screen.queryByText('See your work in new ways')).toBeInTheDocument();
    });
  });
});
