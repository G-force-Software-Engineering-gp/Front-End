import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
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
    const loginLabels = screen.getAllByText('Login');
    expect(loginLabels[0]).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });
});
