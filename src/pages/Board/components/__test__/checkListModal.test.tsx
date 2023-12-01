import AuthContext, { AuthContextType } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CheckListItem } from '../checkListModal';

// Mock the AuthContext value
const mockAuthContext: AuthContextType = {
  user: null,
  setUser: jest.fn(),
  authTokens: null,
  setAuthTokens: jest.fn(),
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  logoutUser: jest.fn(),
};

// Mock the react-query QueryClient
const queryClient = new QueryClient();

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as jest.Mock;

test('renders CheckListItem component', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={mockAuthContext}>
        <CheckListItem
          item={{ id: 1, content: 'Item 1', checked: false }}
          checklist={[]}
          setChecklist={() => {}}
          checkListId={1}
        />
      </AuthContext.Provider>
    </QueryClientProvider>
  );

  // You can add more specific queries/assertions based on your UI
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Item 1'));
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});
