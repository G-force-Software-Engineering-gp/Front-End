import AuthContext, { AuthContextType } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Card } from '../../types';
import { CheckListPopover } from '../checkListPopover';

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
const mockCardData: Card = {
  id: 1,
  title: 'Test Card',
  startdate: null,
  duedate: '2023-10-29T00:00:00Z',
  reminder: '1 Day before',
  storypoint: 5,
  setestimate: 8,
  description: 'This is a sample card description.',
};
// Wrap the component with the necessary providers
const renderComponent = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={mockAuthContext}>
        <CheckListPopover data={mockCardData} />
      </AuthContext.Provider>
    </QueryClientProvider>
  );

test('renders CheckListPopover component', async () => {
  renderComponent();

  // You can add more specific queries/assertions based on your UI
  const checkListButton = screen.getByText('Checklist');
  expect(checkListButton).toBeInTheDocument();
  userEvent.click(checkListButton);

  // Input the title
  userEvent.type(screen.getByLabelText('Title'), 'New Checklist');

  // Click the "Add" button
  userEvent.click(screen.getByText('Add'));

  // You might need to wait for the asynchronous mutation to complete
  await waitFor(() => {
    // Add assertions based on the success state of your mutation
    // For example, check if the form is reset or if a success message is displayed
  });
});
