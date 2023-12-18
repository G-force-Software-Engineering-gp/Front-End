import { AuthProvider } from '@/contexts/AuthContext';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import BoardCard from '../BoardCard';

describe('BoradCard Component', () => {
  test('renders BoradCard component', () => {
    const mockProps = {
      id: 1,
      title: 'Test Board',
      backgroundImage: 'test-image-url',
      has_star: false,
    };
    render(
      <MemoryRouter>
        <AuthProvider>
          <BoardCard {...mockProps} />
        </AuthProvider>
      </MemoryRouter>
    );
  });
  // test('matches snapshot', () => {
  //   const mockProps = {
  //     id: 1,
  //     title: 'Test Board',
  //     backgroundImage: 'test-image-url',
  //     has_star: false,
  //   };
  //   const { asFragment } = render(
  //     <MemoryRouter>
  //       <AuthProvider>
  //         <BoardCard {...mockProps} />
  //       </AuthProvider>
  //     </MemoryRouter>
  //   );
  //   expect(asFragment()).toMatchSnapshot();
});
test('clicking on the card triggers navigation', () => {
  const mockProps = {
    id: 1,
    title: 'Test Board',
    backgroundImage: 'test-image-url',
    has_star: false,
  };
  render(
    <MemoryRouter>
      <AuthProvider>
        <BoardCard {...mockProps} />
      </AuthProvider>
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Test Board'));
  // Add assertions based on the expected behavior after clicking the card
});
test('renders with correct star state', () => {
  const mockPropsWithStar = {
    id: 1,
    title: 'Test Board',
    backgroundImage: 'test-image-url',
    has_star: true,
  };
  const mockPropsWithoutStar = {
    id: 2,
    title: 'Another Board',
    backgroundImage: 'another-image-url',
    has_star: false,
  };

  const { getByTestId: getByTestIdWithStar } = render(
    <MemoryRouter>
      <AuthProvider>
        <BoardCard {...mockPropsWithStar} />
      </AuthProvider>
    </MemoryRouter>
  );
  const { getByTestId: getByTestIdWithoutStar } = render(
    <MemoryRouter>
      <AuthProvider>
        <BoardCard {...mockPropsWithoutStar} />
      </AuthProvider>
    </MemoryRouter>
  );

  const starIconWithStar = getByTestIdWithStar('star-icon1');
  const starIconWithoutStar = getByTestIdWithoutStar('star-icon2');

  expect(starIconWithStar).toBeInTheDocument();
  expect(starIconWithoutStar).toBeInTheDocument();
});

//   test('clicking on the star icon calls SetStarOrNot function', () => {
//     const mockProps = {
//       id: 1,
//       title: 'Test Board',
//       backgroundImage: 'test-image-url',
//       has_star: false,
//     };
//     const setStarOrNotMock = jest.fn();
//     jest.spyOn(React, 'useState').mockReturnValue([false, setStarOrNotMock]);

//     render(
//       <MemoryRouter>
//         <AuthProvider>
//           <BoardCard {...mockProps} />
//         </AuthProvider>
//       </MemoryRouter>
//     );
//     const starIcon = screen.getByTestId('star-icon1');
//     fireEvent.click(starIcon);

//     expect(setStarOrNotMock).toHaveBeenCalledWith(expect.any(Object));
//     // Add assertions based on the expected behavior after clicking the star icon
//   });
// });
