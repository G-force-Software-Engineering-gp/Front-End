import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddWorkSapceHeader from '../AddWorkSapceHeader';

describe('AddWorkSapceHeader Component', () => {
  test('renders AddWorkSpaceHeader component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSapceHeader />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('renders the button with Create content', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSapceHeader />
        </AuthProvider>
      </MemoryRouter>
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });
});
