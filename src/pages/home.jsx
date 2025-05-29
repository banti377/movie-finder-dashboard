import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useMovies from '../hooks/useMovies';
import Error from '../ui/error';
import MovieCard from '../ui/movieCard';
import Spinner from '../ui/spinner';
import Pagination from '../ui/pagination';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [debouncedQuery] = useDebounce(rawQuery, 500);

  const { movies, isLoading, error, totalResults } = useMovies(
    debouncedQuery,
    page
  );

  function handlePageChange(newPage) {
    setSearchParams({ q: rawQuery, page: newPage });
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="text-center pt-24">
        {!isLoading && !error && movies.length === 0 && (
          <p className="text-lg mb-8">Search for your favorite movies above!</p>
        )}

        {isLoading && <Spinner />}

        {!isLoading && !error && movies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            <div>
              <Pagination
                count={totalResults}
                currentPage={page}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
        {error && <Error message={error} />}
      </div>
    </div>
  );
}
