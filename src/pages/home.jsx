import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import useMovieDetails from '../hooks/useMovieDetails';
import useMovies from '../hooks/useMovies';
import Error from '../ui/error';
import Modal from '../ui/modal';
import MovieCard from '../ui/movieCard';
import MovieDetailsCard from '../ui/movieDetailsCard';
import Pagination from '../ui/pagination';
import Spinner from '../ui/spinner';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [debouncedQuery] = useDebounce(rawQuery, 500);

  const { movies, isLoading, error, totalResults } = useMovies(
    debouncedQuery,
    page
  );

  const [selectedId, setSelectedId] = useState(null);

  const { movie: selectedMovie, isLoading: isDetailsLoading } =
    useMovieDetails(selectedId);

  function handlePageChange(newPage) {
    setSearchParams({ q: rawQuery, page: newPage });
  }

  function openModal(id) {
    setSelectedId(id);
  }

  function closeModal() {
    setSelectedId(null);
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="text-center pt-5">
        {!isLoading && !error && movies.length === 0 && (
          <p className="text-lg mb-8">Search for your favorite movies above!</p>
        )}

        {isLoading && <Spinner />}

        {!isLoading && !error && movies.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  onClick={() => openModal(movie.imdbID)}
                  className="cursor-pointer"
                >
                  <MovieCard movie={movie} />
                </div>
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

      <Modal isOpen={!!selectedId} onClose={closeModal}>
        {isDetailsLoading ? (
          <div className="text-center py-20">
            <Spinner />
          </div>
        ) : (
          selectedMovie && <MovieDetailsCard movie={selectedMovie} />
        )}
      </Modal>
    </div>
  );
}
