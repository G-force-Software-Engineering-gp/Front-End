import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
          <AddWorkSpace />
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

  test('handles select field changes', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddWorkSpace />
        </AuthProvider>
      </MemoryRouter>
    );
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    // const buttonSelect = screen.getByTestId('selectClicking');
    // fireEvent.click(buttonSelect);
    const selectTrigger = screen.getByLabelText('Type');
    fireEvent.click(selectTrigger);
    // fireEvent.click(screen.getByText('Operations'));
    // expect(screen.getByLabelText('Type')).toHaveTextContent('Operations');
  });

  // test('handles form submission successfully', async () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <AddWorkSpace />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   // fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Workspace' } });
  //   // fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description.' } });
  //   // fireEvent.mouseDown(screen.getByLabelText('Type'));
  //   // fireEvent.click(screen.getByText('Operations'));
  //   // fireEvent.click(screen.getByRole('button', { name: 'Make The Workspace' }));
  //   // expect().toBeVisible();
  // });

  // test('handles form submission with errors', async () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <AddWorkSpace />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   const button = screen.getByTestId('clicking');
  //   fireEvent.click(button);
  //   // fireEvent.click(screen.getByRole('button', { name: 'Make The Workspace' }));
  //   // expect(/* Add assertions for error feedback */).toBeVisible();
  // });

  // test('interacts with API when making a workspace', async () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <AddWorkSpace />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   // fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Workspace' } });
  //   // fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description.' } });

  //   // fireEvent.mouseDown(screen.getByLabelText('Type'));
  //   // fireEvent.click(screen.getByText('Operations'));
  //   // expect(/* Add assertions for API response */).toBeTruthy();
  // });
});
