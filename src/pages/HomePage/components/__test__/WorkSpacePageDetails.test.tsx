import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import WorkSpacePageDetails from '../WorkSpacePageDetails';

const queryClient = new QueryClient();

describe('WorkSpacePageDetails Component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter initialEntries={['/workspace/123']}>
        <QueryClientProvider client={queryClient}>
          <WorkSpacePageDetails />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  //   test('displays board cards', () => {
  //     const mockData = {
  //       id: 123,
  //       boards: [
  //         { id: 1, title: 'Board 1', backgroundImage: 'bg1.jpg', has_star: false },
  //         { id: 2, title: 'Board 2', backgroundImage: 'bg2.jpg', has_star: true },
  //       ],
  //     };

  //     render(
  //       <MemoryRouter initialEntries={['/workspace/123']}>
  //         <QueryClientProvider client={queryClient}>
  //             <WorkSpacePageDetails />
  //         </QueryClientProvider>
  //       </MemoryRouter>
  //     );

  //     // Check if board cards are rendered
  //     mockData.boards.forEach((board) => {
  //       expect(screen.getByText(board.title)).toBeInTheDocument();
  //       // Add more assertions based on your BoardCard component structure
  //     });
  //   });

  //   test('displays AddBoard component', () => {
  //     const mockData = {
  //       id: 123,
  //       boards: [
  //         { id: 1, title: 'Board 1', backgroundImage: 'bg1.jpg', has_star: false },
  //         { id: 2, title: 'Board 2', backgroundImage: 'bg2.jpg', has_star: true },
  //       ],
  //     };

  //     render(
  //       <MemoryRouter initialEntries={['/workspace/123']}>
  //         <QueryClientProvider client={queryClient}>
  //           <Route path="/workspace/:workspaceId">
  //             <WorkSpacePageDetails />
  //           </Route>
  //         </QueryClientProvider>
  //       </MemoryRouter>
  //     );

  //     // Check if AddBoard component is rendered
  //     expect(screen.getByTestId('addBoard')).toBeInTheDocument();
  //     // Add more assertions based on your AddBoard component structure
  //   });
});
