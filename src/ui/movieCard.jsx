import FavoriteButton from './favoriteButton';

export default function MovieCard({ movie }) {
  const hasPoster = movie.Poster !== 'N/A';

  return (
    <div className="relative border rounded-md p-4 dark:bg-gray-800 text-center">
      <div
        className={`mx-auto w-full h-64 mb-2 rounded flex items-center justify-center ${
          hasPoster ? '' : 'bg-gray-300 dark:bg-gray-700'
        }`}
      >
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="max-h-full object-cover rounded"
          />
        ) : (
          <img
            src="/no-poster.png"
            alt="No poster available"
            className="h-24 object-contain opacity-60"
          />
        )}
      </div>

      <h3 className="text-lg font-semibold">{movie.Title}</h3>
      <p>{movie.Year}</p>

      <FavoriteButton movie={movie} />
    </div>
  );
}
