import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import AddWorkSpace from '../AddWorkSpace';

describe('AddWorkSapce Component', () => {
  test('renders AddWorkSpace component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSpace />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('renders the button with SVG content', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSpace />
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
          <AddWorkSpace />
        </AuthProvider>
      </MemoryRouter>
    );
    
    // Use the "for" attribute to associate the label with the input field
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Description')).toHaveValue('');
    expect(screen.getByLabelText('Type')).toHaveTextContent('Select The Type');
  });
  

  // test('handles input field changes', () => {
  //   render(<AddWorkSpace />);

  //   fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Workspace' } });
  //   fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description.' } });

  //   // Add assertions for updated state
  //   expect(screen.getByLabelText('Name')).toHaveValue('Test Workspace');
  //   expect(screen.getByLabelText('Description')).toHaveValue('Test description.');
  // });

  // test('handles select field changes', () => {
  //   render(<AddWorkSpace />);

  //   fireEvent.mouseDown(screen.getByLabelText('Type'));
  //   fireEvent.click(screen.getByText('Operations'));

  //   // Add assertions for updated state
  //   expect(screen.getByLabelText('Type')).toHaveTextContent('Operations');
  // });

  // test('handles form submission successfully', async () => {
  //   render(<AddWorkSpace />);

  //   fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Workspace' } });
  //   fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description.' } });

  //   fireEvent.mouseDown(screen.getByLabelText('Type'));
  //   fireEvent.click(screen.getByText('Operations'));

  //   fireEvent.click(screen.getByRole('button', { name: 'Make The Workspace' }));

  //   // Add assertions for success state
  //   await waitFor(() => {
  //     expect(/* Add assertions for success feedback */).toBeVisible();
  //   });
  // });

  // test('handles form submission with errors', async () => {
  //   render(<AddWorkSpace />);

  //   fireEvent.click(screen.getByRole('button', { name: 'Make The Workspace' }));

  //   // Add assertions for error state
  //   await waitFor(() => {
  //     expect(/* Add assertions for error feedback */).toBeVisible();
  //   });
  // });

  // test('interacts with API when making a workspace', async () => {
  //   render(<AddWorkSpace />);

  //   fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Workspace' } });
  //   fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description.' } });

  //   fireEvent.mouseDown(screen.getByLabelText('Type'));
  //   fireEvent.click(screen.getByText('Operations'));

  //   await act(async () => {
  //     fireEvent.click(screen.getByRole('button', { name: 'Make The Workspace' }));
  //   });

  //   // Add assertions for API interaction
  //   expect(/* Add assertions for API response */).toBeTruthy();
  // });
});
