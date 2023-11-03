import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login', () => {
  test('check if Login UI renders correctly', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    const headerLoginElement = screen.getByText('Login');
    expect(headerLoginElement).toBeInTheDocument();
  });
});
