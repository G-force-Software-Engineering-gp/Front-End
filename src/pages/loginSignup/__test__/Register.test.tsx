import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Register from '../Register';

describe('Register', () => {
  test('renders the registration form correctly', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>
    );
    const registerLabels = screen.getAllByText('Register');
    expect(registerLabels[0]).toBeInTheDocument();

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();

    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('submits the form with valid data', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </MemoryRouter>
    );

    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'john_mamad.com' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'strongPassword' } });

    // const registerLabels = screen.getAllByText('Register');
    const registerButton = screen.getByRole('button', { name: 'Register' });
    fireEvent.click(registerButton);
    // expect(registerLabels[0]).toBeInTheDocument();
    fireEvent.click(registerButton);
    waitFor(() => screen.getByText(/Invalid email forma/i)).then((errorMessage) => {
      expect(errorMessage).toBeInTheDocument();
      // console.log(errorMessage);
    });
    expect(emailInput).toHaveValue('john_mamad.com');
  });
});
