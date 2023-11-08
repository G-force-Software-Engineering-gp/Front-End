import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePageDetails from '../HomePageDetails';

describe('HomePageDetails Component', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('displays Starred Workspaces section', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Starred Workspaces')).toBeInTheDocument();
  });

  test('displays Recently viewed section', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Recently viewed')).toBeInTheDocument();
  });

  test('displays Your WorkSpaces section', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Your WorkSpaces')).toBeInTheDocument();
  });

});
