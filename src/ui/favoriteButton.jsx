import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';

export default function FavoriteButton({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);
  const isFavorite = favorites.some((m) => m.imdbID === movie.imdbID);

  const toggleFavorite = () => {
    isFavorite ? dispatch(removeFavorite(movie)) : dispatch(addFavorite(movie));
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`absolute bottom-2 right-2 transition ${
        isFavorite ? ' text-red-600 ' : ' dark:text-gray-200 text-black'
      }`}
      aria-label="Toggle Favorite"
    >
      {isFavorite ? (
        <HiHeart className="w-8 h-8" />
      ) : (
        <HiOutlineHeart className="w-8 h-8" />
      )}
    </button>
  );
}
