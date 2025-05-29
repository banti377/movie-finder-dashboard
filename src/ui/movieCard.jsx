import FavoriteButton from './favoriteButton';

export default function MovieCard({ movie }) {
  if (!movie) return null;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-center h-full">
      <div
        className={`mx-auto w-full h-64 mb-2 rounded flex items-center justify-center ${
          movie.Poster !== 'N/A' ? '' : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
          alt={movie.Title}
          className="max-h-full object-cover rounded"
        />
      </div>

      <h3 className="text-lg font-semibold line-clamp-2">{movie.Title}</h3>
      <p className="mb-4">{movie.Year}</p>

      <div className="mt-auto">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  );
}
