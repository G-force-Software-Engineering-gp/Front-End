import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import myTest from './mytest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routers from './pages/Router';
import Board from './pages/Board';
import Header from './components/Header';
import Home from './pages/HomePage/Home';
import { ModeToggle } from './components/ui/mode-toggle';


const queryClient = new QueryClient();

function App() {
  const cardInfo = {
    title: "Task Title",
    description: "This is the description of the task.",
  };

  const listInfo = {
    title: "To-Do List",
  };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          {/* <ModeToggle /> */}
          <Header/>
          <Board />
          <Routers />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
