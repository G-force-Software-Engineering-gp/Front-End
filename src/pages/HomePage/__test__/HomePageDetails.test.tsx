import { AuthProvider } from '@/contexts/AuthContext';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import HomePageDetails from '../HomePageDetails';

describe('HomePageDetails Component', () => {
  it('renders without errors', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
  });

  test('displays Starred Workspaces section', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Starred Workspaces')).toBeInTheDocument();
  });

  test('displays Recently viewed section', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Recently viewed')).toBeInTheDocument();
  });

  test('displays Your WorkSpaces section', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <HomePageDetails />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Your WorkSpaces')).toBeInTheDocument();
  });

//   test('renders Buttons for every WorkSpace', () => {
//     render(
//       <MemoryRouter>
//         <AuthProvider>
//           <HomePageDetails />
//         </AuthProvider>
//       </MemoryRouter>
//     );
    
//     const buttonElement = screen.getByText('Boards');
//     expect(buttonElement).toBeInTheDocument();
//     expect(buttonElement).toHaveClass('mr-1 mt-1 p-2 sm:mt-0');
//   });


  //   test('displays a "Create a new Board" button', () => {
  //     render(
  //       <MemoryRouter>
  //         <AuthProvider>
  //           <HomePageDetails />
  //         </AuthProvider>
  //       </MemoryRouter>
  //     );
  //     expect(screen.getByText('Create a new Board')).toBeInTheDocument();
  //   });

  //   it('displays a message when there are no workspaces', () => {
  //     const mockWorkspaces: [] = [];
  //     jest.mock('axios', () => ({
  //       get: async () => ({ data: mockWorkspaces }),
  //     }));
  //     render(
  //       <MemoryRouter>
  //         <AuthProvider>
  //           <HomePageDetails />
  //         </AuthProvider>
  //       </MemoryRouter>
  //     );
  //     expect(screen.getByText('No workspaces found.')).toBeInTheDocument();
  //   });

  //   it('displays workspace boards', () => {
  //     // Mock data for workspaces and boards
  //     const mockWorkspaces = [
  //       {
  //         name: 'Workspace1',
  //         boards: [
  //           { id: 1, title: 'Board 1', backgroundImage: 'image1.jpg' },
  //           { id: 2, title: 'Board 2', backgroundImage: 'image2.jpg' },
  //         ],
  //       },
  //     ];
  //     render(
  //       <MemoryRouter>
  //         <AuthProvider>
  //           <HomePageDetails />
  //         </AuthProvider>
  //       </MemoryRouter>
  //     );
  //     const authTokens = {
  //       access:
  //         'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5MDkxMTEwLCJpYXQiOjE2OTkwMDQ3MTAsImp0aSI6ImJmYjYxZTc4ZjZmODQyOTFhNGZiN2MwNGI5ZGU4ZjEwIiwidXNlcl9pZCI6MX0.DhQeSSxFcrl8p7mIUnSHL1X4as4UeogzJAW1e8Skabk',
  //     };
  //     jest.mock('@/contexts/AuthContext', () => ({
  //       useContext: () => ({ authTokens }),
  //     }));

  //     // Mocking the Axios call to fetch workspaces
  //     jest.mock('axios', () => ({
  //       get: async () => ({ data: mockWorkspaces }),
  //     }));

  //     // Check if board titles are displayed
  //     expect(screen.getByText('Board 1')).toBeInTheDocument();
  //     expect(screen.getByText('Board 2')).toBeInTheDocument();
  //   });

  //   it('navigates to the correct board when a board is clicked', () => {
  //     // Mock data for a single workspace and board
  //     const mockWorkspaces = [
  //       {
  //         name: 'Workspace1',
  //         boards: [{ id: 1, title: 'Board 1', backgroundImage: 'image1.jpg' }],
  //       },
  //     ];
  //     jest.mock('axios', () => ({
  //       get: async () => ({ data: mockWorkspaces }),
  //     }));

  //     // Mock navigate function from react-router-dom
  //     const mockNavigate = jest.fn();
  //     jest.mock('react-router-dom', () => ({
  //       useNavigate: () => mockNavigate,
  //     }));

  //     render(<HomePageDetails />);

  //     // Click on the board
  //     const boardElement = screen.getByText('Board 1');
  //     fireEvent.click(boardElement);

  //     // Ensure it navigates to the correct board path
  //     expect(mockNavigate).toHaveBeenCalledWith('/board/1');
  //   });
});
