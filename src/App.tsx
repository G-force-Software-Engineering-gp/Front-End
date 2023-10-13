import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import MyTest from './mytest';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <MyTest />
    </ThemeProvider>
  );
}

export default App;
