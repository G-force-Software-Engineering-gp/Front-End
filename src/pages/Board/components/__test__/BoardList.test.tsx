import AuthContext, { AuthProvider } from '@/contexts/AuthContext';
import { server } from '@/mocks/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ListCard } from '../BoardList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe('ListCard component', () => {
  it('renders card data correctly', async () => {
    const board1 = {
      id: 1,
      title: 'workspace1 board1',
      backgroundImage:
        'https://amirmohammadkomijani.pythonanywhere.com/media/images/leonard-von-bibra-UQaht0LBiYc-unsplash.jpg',
      workspace: 1,
      list: [
        { id: 1, title: 'List1 board5' },
        { id: 4, title: 'board 1 list1' },
        { id: 5, title: 'board 1 list2' },
      ],
      lastseen: '2023-12-18T17:21:24.901979Z',
      has_star: false,
    };
    const list1 = {
      id: 1,
      title: 'List1 board5',
      board: 1,
      card: [
        { id: 17, title: 'dnd test2 change', order: 1 },
        { id: 19, title: 'self-assignment card check', order: 2 },
        { id: 7, title: 'card 1 list 4', order: 3 },
      ],
    };
    const card1 = {
      id: 17,
      order: 1,
      title: 'dnd test2 change',
      list: 1,
      members: [
        {
          id: 1,
          user: {
            first_name: 'amir mohammad',
            last_name: 'komijani2',
            email: 'amir@domain.com',
            username: 'amir_komijani',
          },
        },
        {
          id: 4,
          user: {
            first_name: 'test name2',
            last_name: 'test lname2',
            email: 'usertest2@domain.com',
            username: 'user test2',
          },
        },
      ],
      role: [
        { id: 19, role: 'assigned' },
        { id: 39, role: 'member' },
      ],
      labels: [
        { id: 1, color: 'red', title: 'backend', board: 1 },
        { id: 2, color: '#4bce97', title: 'frontend', board: 1 },
        { id: 3, color: '#dcdfe4', title: 'devops', board: 1 },
        { id: 5, color: '#1f845a', title: 'tamrakoz 2', board: 1 },
      ],
      startdate: '2023-11-13T20:30:00Z',
      duedate: '2023-11-21T20:30:00Z',
      reminder: 'At time of due date',
      storypoint: 17,
      setestimate: 7,
      description: 'mamad\nEhsan\nAryan\nAli',
      status: 'overdue',
      comment: null,
    };
    server.use(
      rest.get('https://amirmohammadkomijani.pythonanywhere.com/tascrum/list/1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(list1));
      })
    );
    server.use(
      rest.get('https://amirmohammadkomijani.pythonanywhere.com/tascrum/card/17/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(card1));
      })
    );
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ListCard cardId={card1.id} listId={list1.id} columns={board1.list} />
          </AuthProvider>
        </QueryClientProvider>
      </MemoryRouter>
    );
    // await new Promise(process.nextTick);
    await waitFor(() => {
      expect(screen.getByText(/id - \d+ - order:\d+/)).toBeInTheDocument();
    });
    expect(screen.getByText(`id - ${card1.id} - order:${card1.order}`)).toBeInTheDocument();
  });
});
