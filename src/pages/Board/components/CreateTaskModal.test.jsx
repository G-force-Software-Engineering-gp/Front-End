import AuthContext, { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, getByRole, getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import CreateTaskModal from './CreateTaskModal';

const mockAuthContext = {
  authTokens: {
    access: 'mockAccessToken',
  },
};

const queryClient = new QueryClient();

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CreateTaskModal listId={1} />
        </QueryClientProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('CreateListModal', () => {
  it('renders modal and submits form', async () => {
    // Mocking the mutation function
    // const mockMutate = jest.fn();
    // useMutation.mockReturnValue({ mutate: mockMutate, isLoading: false });

    renderComponent();

    // Open the modal
    userEvent.click(screen.getByText('New Task'));

    // Wait for the modal to open
    await waitFor(() => {
      expect(screen.getByText('Add New Task')).toBeInTheDocument();
    });

    userEvent.type(screen.getByLabelText(/title/i), 'NewTask');

    userEvent.click(screen.getByText('Add Task'));

    // fireEvent.submit(screen.getByRole('button'));
    // const myInputElement = getByRole('title');

    // Submit the form

    // Wait for the form submission
    // await waitFor(() => {
    //   expect(mockMutate).toHaveBeenCalledWith({ title: 'New Column Title', board: 1 }, expect.anything());
    // });

    // Close the modal
    // userEvent.click(screen.getByText('Cancel'));

    // Wait for the modal to close
    // await waitFor(() => {
    //   expect(screen.queryByText('Add Column')).toBeNull();
    // });
  });
});
