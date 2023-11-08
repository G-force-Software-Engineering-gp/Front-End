import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

describe('Home Component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('displays a Header component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('displays a HomeSideBar component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepageSidebar')).toBeInTheDocument();
  });

  test('displays a HomePageDetails component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepageDetails')).toBeInTheDocument();
  });

  it('correctly positions the components', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Home />
        </AuthProvider>
      </MemoryRouter>
    );
    const header = screen.getByTestId('header');
    const sidebar = screen.getByTestId('homepageSidebar');
    const details = screen.getByTestId('homepageDetails');

    expect(header).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
    expect(details).toBeInTheDocument();
  });
});
