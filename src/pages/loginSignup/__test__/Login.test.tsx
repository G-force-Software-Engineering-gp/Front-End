import AuthContext, { AuthContextType, AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

jest.mock('@/contexts/AuthContext');
jest.mock('react-hook-form');

const mockAuthContext: AuthContextType = {
  user: null,
  setUser: jest.fn(),
  authTokens: null,
  setAuthTokens: jest.fn(),
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  logoutUser: jest.fn(),
};

describe('Login', () => {
  it('should submit the form with valid credentials', async () => {
    // Mock the useForm hook
    // MockReturnValue , mockImplemention , .....
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn<SubmitHandler<any>, any>((onSubmit) => async (data, e) => {
        await act(async () => onSubmit(data, e));
      }),
      formState: { errors: {}, isSubmitting: false },
    });

    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Interaction with the form elements
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Mock form submission
    fireEvent.click(loginButton);

    // Expectations
    await waitFor(() => {
      expect(mockAuthContext.loginUser).toHaveBeenCalled();
    });
  });
});
