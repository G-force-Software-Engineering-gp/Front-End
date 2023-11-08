import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
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

});
