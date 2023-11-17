import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

  test('initial state is set correctly', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSapceHeader />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    expect(screen.getByPlaceholderText('Write name of your workspace')).toHaveValue('');
    expect(screen.getByPlaceholderText('Type your message here.')).toHaveValue('');
    expect(screen.getByLabelText('Type')).toHaveTextContent('Select The Type');
  });

  test('handles input field changes', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSapceHeader />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    fireEvent.change(screen.getByPlaceholderText('Write name of your workspace'), {
      target: { value: 'Test Workspace' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type your message here.'), {
      target: { value: 'Test description.' },
    });
    expect(screen.getByPlaceholderText('Write name of your workspace')).toHaveValue('Test Workspace');
    expect(screen.getByPlaceholderText('Type your message here.')).toHaveValue('Test description.');
  });

  // test('handles select field changes', () =w
});
