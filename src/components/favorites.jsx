import { useSelector } from 'react-redux';
import MovieCard from '../ui/movieCard';

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.movies);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="text-center pt-5">
        {favorites.length === 0 ? (
          <p className="text-lg mb-8">No favorite movies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
