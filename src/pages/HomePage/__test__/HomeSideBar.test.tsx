import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import React from 'react';
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
    // expect(screen.getByText('+')).toBeInTheDocument();
  });

  //   it('fetches and displays workspaces', async () => {
  //     const mockWorkspaces = [
  //       { name: 'Workspace 1' },
  //       { name: 'Workspace 2' },
  //     ];
  //     // Mock Axios response to return workspaces
  //     axios.get.mockResolvedValueOnce({ data: mockWorkspaces });

  //     render(<HomeSideBar />);

  //     // Wait for Axios to complete the API call
  //     await waitFor(() => {
  //       expect(screen.getByText('Workspace 1')).toBeInTheDocument();
  //       expect(screen.getByText('Workspace 2')).toBeInTheDocument();
  //     });
  //   });

  //   it('displays dark or light mode image based on theme', () => {
  //     // Mock the theme as 'dark'
  //     jest.spyOn(require('@/components/theme-provider'), 'useTheme').mockReturnValue({ theme: 'dark' });
  //     render(<HomeSideBar />);
  //     expect(screen.getByAltText('')).toHaveAttribute('src', '../../pics/scheduleDark.png');
  //   });
});
