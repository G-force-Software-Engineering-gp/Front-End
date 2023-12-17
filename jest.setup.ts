import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { server } from '@/mocks/server';

// Enable mocking before all tests run (server.listen()); enable mocking ON THE GLOBAL LEVEL
beforeAll(() => server.listen());

// Reset any request handlers between tests (server.resetHandlers());
afterEach(() => server.resetHandlers());

// Restore native request-issuing modules after all tests run (server.close()).
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});
