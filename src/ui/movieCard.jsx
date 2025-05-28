import FavoriteButton from './favoriteButton';

export default function MovieCard({ movie }) {
  return (
    <div className="relative border rounded-md p-4 dark:bg-gray-800 text-center">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
        alt={movie.Title}
        className="mx-auto object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{movie.Title}</h3>
      <p>{movie.Year}</p>
      <p>
        {movie.Released} &bull; {movie.Runtime}
      </p>
      <p>{movie.Genre}</p>
      <p>
        <span>⭐</span>
        {movie.imdbRating} IMDB rating
      </p>
      <FavoriteButton movie={movie} />
    </div>
  );
}
