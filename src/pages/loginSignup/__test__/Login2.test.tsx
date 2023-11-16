import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login UI', () => {
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

  it('testing password for valid and invalid inputs', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(passwordInput, {
      target: { value: 'passWord' }, // Less than 8 characters
    });
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    waitFor(() => screen.getByText(/Password must be at least 8 characters long/i)).then((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
    expect(passwordInput).toHaveValue('passWord');
  });
  it('testing email for valid and invalid input', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(emailInput, {
      target: { value: 'mamad' }, // check if it is email or not
    });
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
    // Expect an error message to be present
    waitFor(() => screen.getByText(/Email is required/i)).then((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
    });
    // checking emailInput for what it has
    expect(emailInput).toHaveValue('mamad');
  });
});
