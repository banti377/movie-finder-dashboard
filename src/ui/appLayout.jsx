import { Outlet, useSearchParams } from 'react-router-dom';
import Header from '../components/header';

export default function AppLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <>
      <Header query={query} setQuery={(q) => setSearchParams({ q })} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
