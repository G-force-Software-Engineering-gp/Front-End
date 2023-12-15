import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BurnDownPage from '../BurnDownPage';

const queryClient = new QueryClient();

describe('BurnDownPage Component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <BurnDownPage />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  test('displays BoardHeader component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <BurnDownPage />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('boardHeader')).toBeInTheDocument();
  });

  test('displays BurnDownChart component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <BurnDownPage />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('burnDownChart')).toBeInTheDocument();
  });

  // Add more tests based on the specific behavior and structure of your BurnDownPage component
});
