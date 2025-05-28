import { useEffect, useState } from 'react';

// const KEY = 'c8ee438b';
const KEY = '59fcae4b';

export default function useMovies(query, page = 1) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(
            query
          )}&page=${page}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Response === 'False')
          throw new Error(data.Error || 'Movie not found');

        setTotalResults(Number(data.totalResults));

        const detailedMovies = await Promise.all(
          data.Search.map(async (movie) => {
            const detailRes = await fetch(
              `https://www.omdbapi.com/?apikey=${KEY}&i=${movie.imdbID}`
            );
            return await detailRes.json();
          })
        );

        setMovies(detailedMovies);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      setTotalResults(0);
      return;
    }

    fetchMovies();

    return () => controller.abort();
  }, [query, page]);

  return { movies, isLoading, error, totalResults };
}
