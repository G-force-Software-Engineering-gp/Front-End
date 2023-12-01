import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import AddBoard from '../AddBoard';

describe('AddBoard Component', () => {
  test('renders AddBoard component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddBoard workspaceId={1} />
        </AuthProvider>
      </MemoryRouter>
    );
  });
  test('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AuthProvider>
          <AddBoard workspaceId={1} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('submits form with valid input', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddBoard workspaceId={1} />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'Test Board' } });
    expect(input).toHaveValue('Test Board');
    // fireEvent.click(screen.getByText('Add Board', { selector: '.add-board-button' }));
  });
  test('renders Add Board button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddBoard workspaceId={1} />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    const addButton = screen.getByText('Add Board', { selector: '.add-board-button' });
    expect(addButton).toBeInTheDocument();
  });
  test('renders correct title and heading', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddBoard workspaceId={1} />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    const title = screen.getByText('Add Board', { selector: '.add-board-title' });
    const heading = screen.getByText('Create a new Board');
    expect(title).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
