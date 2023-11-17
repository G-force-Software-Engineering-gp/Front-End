import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { HomeSideBar } from '../HomeSideBar';

describe('HomeSideBar', () => {
  it('renders the component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomeSideBar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepageSidebar')).toBeInTheDocument();
  });

  test('displays "Boards," "Templates," and "Home" buttons', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomeSideBar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Boards')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('displays workspace buttons', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomeSideBar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Workspaces')).toBeInTheDocument();
  });

  test('fetches and displays workspaces', async () => {
    const mockWorkspaces = [{ name: 'Workspace 1' }, { name: 'Workspace 2' }];
    jest.mock('axios', () => ({
      get: async () => ({ data: mockWorkspaces }),
    }));

    render(
      <MemoryRouter>
        <AuthProvider>
          <HomeSideBar />
        </AuthProvider>
      </MemoryRouter>
    );
    // Wait for Axios to complete the API call
    waitFor(() => {
      expect(screen.getByText('Workspace 1')).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText('Workspace 2')).toBeInTheDocument();
    });
  });

  test('displays dark or light mode image based on theme', () => {
    jest.spyOn(require('@/components/theme-provider'), 'useTheme').mockReturnValue({ theme: 'dark' });
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomeSideBar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByAltText('')).toHaveAttribute('src', 'scheduleDark.png');
  });
});
