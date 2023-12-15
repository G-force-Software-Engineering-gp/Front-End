import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BurnDownChart from '../BurnDownChart';

const queryClient = new QueryClient();

describe('BurnDownChart Component', () => {
  test('renders without errors', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <BurnDownChart />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  test('displays CreateBurnDown component', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <BurnDownChart />
        </QueryClientProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('createBurnDown')).toBeInTheDocument();
  });

//   test('displays Table component', () => {
//     render(
//       <MemoryRouter>
//         <QueryClientProvider client={queryClient}>
//           <BurnDownChart />
//         </QueryClientProvider>
//       </MemoryRouter>
//     );
//     expect(screen.getByTestId('table')).toBeInTheDocument();
//   });

    // test('displays BurnDownChart Card component', () => {
    //   render(
    //     <MemoryRouter>
    //       <BurnDownChart />
    //     </MemoryRouter>
    //   );
    //   expect(screen.getByTestId('burnDownChartCard')).toBeInTheDocument();
    // });

  //   test('displays Loading Skeletons while fetching data', () => {
  //     render(
  //       <MemoryRouter>
  //         <BurnDownChart />
  //       </MemoryRouter>
  //     );
  //     // Replace these test IDs with the actual IDs or attributes used in your Skeleton components
  //     expect(screen.getByTestId('loadingTableSkeleton')).toBeInTheDocument();
  //     expect(screen.getByTestId('loadingChartSkeleton')).toBeInTheDocument();
  //   });

  // Add more tests based on the specific behavior and structure of your BurnDownChart component
});
