import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Login from '../Login';

// jest.mock('@/contexts/AuthContext', () => ({
//   __esModule: true,
//   default: {
//     Provider: ({ children }: any) => {
//       // You can provide a mock value here if needed
//       const mockValue = {
//         // Define the values that the context provides
//         // For example, loginUser function
//         loginUser: jest.fn(),
//       };

//       return <>{children(mockValue)}</>;
//     },
//   },
// }));

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

  // it('displays error message for invalid password', async () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <Login />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   // Mock loginUser function
  //   const { loginUser } = require('@/contexts/AuthContext');
  //   loginUser.mockRejectedValueOnce(new Error('Password must be at least 8 characters long'));

  //   // Fill in an invalid password
  //   fireEvent.change(screen.getByPlaceholderText('Password'), {
  //     target: { value: 'pass' }, // Less than 8 characters
  //   });

  //   // Click the "Login" button
  //   fireEvent.click(screen.getByText('Login'));

  //   // Check if an error message is displayed
  //   await waitFor(() => {
  //     expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
  //   });
  // });
});
