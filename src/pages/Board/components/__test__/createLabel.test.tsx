import AuthContext, { AuthContextType } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateLable } from '../createLable';

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
describe('CreateLabel', () => {
  it('renders the component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthContext}>
          <CreateLable />
        </AuthContext.Provider>
      </QueryClientProvider>
    );
    expect(screen.getByText('Create a new label')).toBeInTheDocument();
  });

  it('opens and closes the popover', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthContext}>
          <CreateLable />
        </AuthContext.Provider>
      </QueryClientProvider>
    );
    const button = screen.getByText('Create a new label');

    expect(screen.queryByText('Create label')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('Create label')).toBeInTheDocument();

    fireEvent.click(button);

    waitFor(() => {
      expect(screen.queryByText('Create label')).not.toBeInTheDocument();
    });
  });

  it('creates a new label', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockAuthContext}>
          <CreateLable />
        </AuthContext.Provider>
      </QueryClientProvider>
    );
    const button = screen.getByText('Create a new label');

    fireEvent.click(button);

    const titleInput = screen.getByLabelText('Title');

    const createButton = screen.getByText('Create');

    userEvent.type(titleInput, 'New Label Title');
    userEvent.click(createButton);
    // await new Promise(process.nextTick);

    await waitFor(() => {
      expect(screen.queryByText('Create label')).not.toBeInTheDocument();
    });
  });
});
