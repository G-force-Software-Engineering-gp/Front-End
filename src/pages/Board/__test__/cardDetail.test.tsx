import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '@/contexts/AuthContext';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CardDetail } from '../cardDetail';
import { Card } from '../types';

describe('CardDetail Component', () => {
  const sampleCard: Card = {
    id: 1,
    title: 'Sample Card Title',
  };

  test('renders the card detail dialog correctly', () => {
    const setModalOpen = jest.fn();

    render(
      <MemoryRouter>
        <AuthProvider>
          <CardDetail modalOpen={true} setModalOpen={setModalOpen} data={sampleCard} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Sample Card Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  //   test('handles user interactions', async () => {
  //     const setModalOpen = jest.fn();

  //     render(
  //       <MemoryRouter>
  //         <AuthProvider>
  //           <CardDetail modalOpen={true} setModalOpen={setModalOpen} data={sampleCard} />
  //         </AuthProvider>
  //       </MemoryRouter>
  //     );

  //     const saveChangesButton = screen.getByText('Save changes');
  //     userEvent.click(saveChangesButton);

  // expect(setModalOpen).toHaveBeenCalledTimes(1);
  //});
});
