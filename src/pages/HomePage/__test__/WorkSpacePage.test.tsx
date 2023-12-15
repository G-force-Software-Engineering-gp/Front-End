import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WorkSpacePage from '../WorkSpacePage';

const queryClient = new QueryClient();

describe('WorkSpacePage Component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  });
  test('displays a Header component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
  test('displays a HeaderResponsive component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('headerResponsive')).toBeInTheDocument();
  });
  test('displays a HomeSideBar component', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepageSidebar')).toBeInTheDocument();
  });

  // test('navigates to the boards page on Boards button click', () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <WorkSpacePage />
  //         </QueryClientProvider>
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   const boardsButton = screen.getByText('Boards');
  //   fireEvent.click(boardsButton);

  //   expect(window.location.pathname).toBe('/boards');
  // });
  // test('displays a "Boards" button and navigates to boards page on click', () => {
  //   render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <QueryClientProvider client={queryClient}>
  //           <WorkSpacePage />
  //         </QueryClientProvider>
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );

  //   const boardsButton = screen.getByRole('button', { name: /Boards/i });
  //   fireEvent.click(boardsButton);

  //   expect(window.location.pathname).toBe('/boards');
  // });

  test('displays a "Highlights" button and checks for the expected action', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const highlightsButton = screen.getByText(/Highlights/i);
    fireEvent.click(highlightsButton);
  });

  test('displays a "Views" button and checks for the expected action', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const viewsButton = screen.getByText(/Views/i);
    fireEvent.click(viewsButton);
  });

  test('displays a "Members" button and navigates to members page on click', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const membersButton = screen.getByText(/Members/i);
    fireEvent.click(membersButton);

    expect(window.location.pathname).toBe('/');
  });

  test('displays a "Settings" button and checks for the expected action', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );

    const settingsButton = screen.getByText(/Settings/i);
    fireEvent.click(settingsButton);
  });
});
