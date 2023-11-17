import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { CardDetail } from '../cardDetail';
import { Card } from '../types';

const queryClient = new QueryClient();

describe('CardDetail Component', () => {
  const sampleCard: Card = {
    id: 1,
    title: 'Sample Card Title',
  };

  test('renders the card detail dialog correctly', () => {
    const setModalOpen = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <CardDetail modalOpen={true} setModalOpen={setModalOpen} data={sampleCard} />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Sample Card Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
