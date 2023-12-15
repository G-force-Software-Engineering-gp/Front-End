import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
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

  //   test('displays a WorkSpacePageDetails component', () => {
  //     render(
  //         <MemoryRouter>
  //         <AuthProvider>
  //           <QueryClientProvider client={queryClient}>
  //             <WorkSpacePage />
  //           </QueryClientProvider>
  //         </AuthProvider>
  //       </MemoryRouter>
  //     );
  //     expect(screen.getByTestId('workSpacePageDetails')).toBeInTheDocument();
  //   });

  it('correctly positions the components', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <WorkSpacePage />
          </QueryClientProvider>
        </AuthProvider>
      </MemoryRouter>
    );
    const header = screen.getByTestId('header');
    const headerResponsive = screen.getByTestId('headerResponsive');
    const homeSideBar = screen.getByTestId('homepageSidebar');
    // const workSpacePageDetails = screen.getByTestId('workSpacePageDetails');

    expect(header).toBeInTheDocument();
    expect(headerResponsive).toBeInTheDocument();
    expect(homeSideBar).toBeInTheDocument();
    // expect(workSpacePageDetails).toBeInTheDocument();
  });
});
