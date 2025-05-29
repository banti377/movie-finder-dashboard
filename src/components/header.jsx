import { HiHeart, HiOutlineMoon, HiOutlineSun, HiXMark } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/themeContext';

export default function Header({ query, setQuery }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 left-0 bg-white text-black px-4 py-3 shadow-md dark:bg-gray-900 dark:text-white border-b-2 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <Link to="/" className="text-2xl font-semibold">
          MovieFinder
        </Link>

        <div className="w-60 sm:max-w-md relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 pr-10 border-2 rounded-md text-black focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Link
            to="/favorites"
            className="flex items-center gap-1 text-black hover:text-red-600 transition-colors dark:text-white dark:hover:text-red-400"
          >
            <HiHeart className="w-5 h-5" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
          </button>
        </div>
      </div>
    </header>
  );
}
