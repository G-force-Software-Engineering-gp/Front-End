import { AuthProvider } from '@/contexts/AuthContext';
import { server } from '@/mocks/server';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import AddImage from '../AddImage';

describe('AddImage Component', () => {
  let file;

  beforeEach(() => {
    file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  });
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
    const button = screen.getByTestId('clicking');
    fireEvent.click(button);
    const fileInput = screen.getByPlaceholderText(/Image/i);
    const file = new File(['bsbdbw'], 'example.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    // expect(fileInput?.files).toHaveLength(1);
    // expect(fileInput?.files[0].name).toBe('example.jpg');
  });

  // test('handles file upload', async () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <AddImage />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   const button = screen.getByTestId('clicking');
  //   fireEvent.click(button);
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
  test('upload AddImage component', async () => {
    server.use(
      rest.put('https://amirmohammadkomijani.pythonanywhere.com/tascrum/board-bgimage/undefined/', (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <AddImage />
        </AuthProvider>
      </MemoryRouter>
    );

    // Open the dialog
    await userEvent.click(screen.getByTestId('clicking'));

    // Check if the dialog is rendered
    expect(screen.getByText('Select Image')).toBeInTheDocument();

    // Select a file
    const fileInput = screen.getByLabelText('Select Images');
    const testFile = new File(['(content)'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [testFile] } });

    // Click the "Change Picture" button
    await userEvent.click(screen.getByText('Change Picture'));
    // await new Promise(process.nextTick);

    // Wait for the API request to complete
    // await waitFor(() => {
    //   expect(screen.getByText('Successful')).toBeInTheDocument();
    // });
  });
});
