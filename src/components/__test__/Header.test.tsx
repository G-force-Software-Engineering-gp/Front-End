import AuthContext, { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, getByPlaceholderText, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Header'; // Import your Header component
import { ModeToggle } from '../ui/mode-toggle';

describe('Header Component', () => {
  test('should render without errors', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('Header component matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Clicking the logo navigates to the home page', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    const LogoElement = screen.getByText('Logo and Name');
    fireEvent.click(LogoElement);
  });

  test('Clicking the User2 icon navigates to the settings page', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    const LogoElement = screen.getByTestId('user-icon');
    fireEvent.click(LogoElement);
  });

  test('Typing into the search input updates its value', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test Search' } });
    expect(input.value).toBe('Test Search');
  });

  // test('Clicking the mode toggle button changes the mode', () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <Header />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   // render(<ModeToggle />);
  //   const modeToggle = screen.getByTestId('mode-toggle');
  //   fireEvent.click(modeToggle);
  // });

  test('Hides user information when not authenticated', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.queryByText('User2')).toBeNull();
  });

  // test('Displays workspaces correctly', async () => {
  //   const mockWorkspaces = [
  //     { name: 'Workspace1', description: 'Description1' },
  //     { name: 'Workspace2', description: 'Description2' },
  //   ];

  //   jest.mock('axios', () => ({
  //     get: async () => ({ data: mockWorkspaces }),
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