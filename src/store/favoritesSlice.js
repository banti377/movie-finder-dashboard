import { createSlice } from '@reduxjs/toolkit';

const loadFavorites = () => {
  try {
    const data = localStorage.getItem('favoriteMovies');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const saveFavorites = (movies) => {
  try {
    localStorage.setItem('favoriteMovies', JSON.stringify(movies));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.movies.find(
        (m) => m.imdbID === action.payload.imdbID
      );
      if (!exists) {
        state.movies.push(action.payload);
        saveFavorites(state.movies);
      }
    },
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (m) => m.imdbID !== action.payload.imdbID
      );
      saveFavorites(state.movies);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
