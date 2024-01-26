import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../Router';

describe('Router Component', () => {
  test('renders login route', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Router />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Dont have Account/i)).toBeInTheDocument();
    });
  });
  // Add more tests for other routes as needed
});
