import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe('Home Component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  test('displays a Header component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('displays a HomeSideBar component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepageSidebar')).toBeInTheDocument();
  });

  test('displays a HomePageDetails component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepageDetails')).toBeInTheDocument();
  });

  it('correctly positions the components', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Home />
          </AuthProvider>
        </QueryClientProvider>
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
