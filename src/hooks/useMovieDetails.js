import { useEffect, useState } from 'react';

const KEY = '59fcae4b';

export default function useMovieDetails(imdbID) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!imdbID) return;

    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movie details');

        const data = await res.json();

        if (data.Response === 'False')
          throw new Error(data.Error || 'Movie details not found');

        setMovie(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();

    return () => controller.abort();
  }, [imdbID]);

  return { movie, isLoading, error };
}
