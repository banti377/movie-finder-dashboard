import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/themeContext';
import Favorites from './pages/favorites';
import Home from './pages/home';
import AppLayout from './ui/appLayout';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
