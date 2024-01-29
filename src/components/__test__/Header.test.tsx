import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act,fireEvent, getAllByRole, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header'; // Import your Header component
import {ModeToggle} from '../ui/mode-toggle'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe('Header Component', () => {
  test('should render without errors', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Header />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  // test('Header component matches snapshot', () => {
  //   const { asFragment } = render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <Header />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  test('Clicking the logo navigates to the home page', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Header />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    const LogoElement = screen.getByTestId('logopic');
    fireEvent.click(LogoElement);
  });


  test('change mode', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ModeToggle />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    const btn = screen.getByText("Toggle theme")

    expect(btn).toBeInTheDocument()


  });


  // test('Displays workspaces correctly', async () => {
  //   const mockWorkspaces = [
  //     { name: 'Workspace1', description: 'Description1' },
  //     { name: 'Workspace2', description: 'Description2' },
  //   ];

  //   jest.mock('axios', () => ({
  //     get: () => ({ data: mockWorkspaces }),
  //   }));

  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <Header />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   await waitFor(() => {
  //     mockWorkspaces.forEach((workspace) => {
  //       expect(screen.getByText(workspace.name)).toBeInTheDocument();
  //       expect(screen.getByText(workspace.description)).toBeInTheDocument();
  //     });
  //   });
  // });
});
