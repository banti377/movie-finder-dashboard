export default function MovieDetailsCard({ movie }) {
  if (!movie) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
        alt={movie.Title}
        className="w-full md:w-48 h-auto object-cover rounded-lg shadow-lg"
      />
      <div className="flex-1 text-blac dark:text-white">
        <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
        <p className="text-sm mb-4">
          {movie.Year} • {movie.Genre}
        </p>

        <div className=" space-y-2">
          <p>
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
          <p>
            <span className="font-semibold">Actors:</span> {movie.Actors}
          </p>
          <p>
            <span className="font-semibold">IMDB Rating:</span> ⭐{' '}
            {movie.imdbRating}
          </p>
          <p>
            <span className="font-semibold">Plot:</span> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}
