import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../Router';

describe('PrivateRoute Component', () => {
  test('renders login route', async () => {
    render(
      <MemoryRouter initialEntries={['/board/1']}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Dont have Account/i)).toBeInTheDocument();
    });
  });
  // Add more tests for other routes as needed
});
