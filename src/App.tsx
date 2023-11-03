import { ThemeProvider } from '@/components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Routers from './pages/Router';
import Settings from './pages/settingsPage';

const queryClient = new QueryClient();

function App() {
  // const cardInfo = {
  //   title: "Task Title",
  //   description: "This is the description of the task.",
  // };

  // const listInfo = {
  //   title: "To-Do List",
  // };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          {/* <ModeToggle /> */}
          {/* <Header/> */}
          {/* {/* <Board /> */}
          {/* <Board /> */}
          {/* <CardDetail /> */}
          {/* <Settings /> */}
          <Routers />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
