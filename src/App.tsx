import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import myTest from './mytest';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Routers from './pages/Router';



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
        <ModeToggle />
        {/* <MyTest /> */}
        <Routers />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
