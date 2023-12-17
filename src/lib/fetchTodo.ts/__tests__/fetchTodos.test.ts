import { server } from '@/mocks/server';
import { http } from 'msw';
import { describe } from 'node:test';
import fetchTodos from '../fetchTodos';

describe('fetch todos lib function', () => {
  it('should return the correct number of todo items', async () => {
    const todosArray = await fetchTodos();
    expect(todosArray.length).toBe(4);
  });
});
