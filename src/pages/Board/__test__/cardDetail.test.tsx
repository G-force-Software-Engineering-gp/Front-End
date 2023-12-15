import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CardDetail } from '../cardDetail';
import { Card } from '../types';

const queryClient = new QueryClient();

describe('CardDetail', () => {
  it('should update card data on change', async () => {
    const mockCardData: Card = {
      id: 1,
      title: 'Test Card',
      startdate: null,
      duedate: '2023-10-29T00:00:00Z',
      reminder: '1 Day before',
      storypoint: 5,
      setestimate: 8,
      description: 'This is a sample card description.',
      comment: 'This is a sample card comment.',
    };

    const mockSetModalOpen = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <CardDetail modalOpen={true} setModalOpen={mockSetModalOpen} data={mockCardData} />
      </QueryClientProvider>
    );
    const inputElement = screen.getByDisplayValue('Test Card');
    fireEvent.change(inputElement, { target: { value: 'Updated Modal Title' } });
    expect(inputElement).toHaveValue('Updated Modal Title');

    // Add more interactions as needed

    // For asynchronous actions, you might want to wait for some elements to appear
    await screen.findByText('Mamad Mirza');
    expect(await screen.findByText('Mamad Mirza')).toBeInTheDocument();

    // Wait for the mutation to complete (if applicable)
    await waitFor(() => {
      // Add assertions based on your application logic
    });

    // Verify that the setModalOpen function was not called (if applicable)
    expect(mockSetModalOpen).not.toHaveBeenCalled();
  });
});
