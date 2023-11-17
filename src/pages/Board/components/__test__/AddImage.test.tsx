import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddImage from '../AddImage';

describe('AddImage Component', () => {
  test('renders AddImage component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddImage />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('handles file change event', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddImage />
        </AuthProvider>
      </MemoryRouter>
    );

    // const fileInput = screen.getByPlaceholderText('Image');
    // const file = new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' });
    // fireEvent.change(fileInput, { target: { files: [file] } });
    // expect(screen.getByTestId('image-input')).toHaveValue('example.jpg');
  });

  // test('handles file upload', async () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <AddImage />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   waitFor(() => {
  //   //   const pa = screen.getAllByText('avdbvd');
  //     const fileInput = screen.getByLabelText('Select Image');
  //     const file = new File(['dummy content'], 'example.jpg', { type: 'image/jpeg' });
  //     fireEvent.change(fileInput, { target: { files: [file] } });
  //     fetch.mockResponseOnce(JSON.stringify({ ok: true }));
  //     fireEvent.click(screen.getByText('Change Picture'));
  //     expect(screen.getByText('Successful')).toBeInTheDocument();
  //   });
  // });

  test('opens dialog on button click', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddImage />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
