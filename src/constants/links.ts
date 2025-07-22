
export const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w200';
export const NO_POSTER_IMAGE = '/no-poster.png';
export const NOTE_LABEL = 'Note :';
export const DETAILS_LABEL = 'Voir les détails';


const API_BASE = 'https://api.themoviedb.org/3';
export const getApiKey = () => import.meta.env.VITE_TMDB_API_KEY;

export const TMDB_MOVIE_DETAIL = (id: string | number) =>
  `${API_BASE}/movie/${id}?api_key=${getApiKey()}`;

export const TMDB_MOVIE_CREDITS = (id: string | number) =>
  `${API_BASE}/movie/${id}/credits?api_key=${getApiKey()}`;

export const TMDB_MOVIE_SIMILAR = (id: string | number) =>
  `${API_BASE}/movie/${id}/similar?api_key=${getApiKey()}`;

export const TMDB_MOVIES_BY_CATEGORY = (category: string) =>
  `${API_BASE}/movie/${category}?api_key=${getApiKey()}`;

export const TMDB_SEARCH_MOVIE = (query: string) =>
  `${API_BASE}/search/movie?api_key=${getApiKey()}&query=${encodeURIComponent(query)}`;

export const ROUTE_HOME = '/';
export const ROUTE_MOVIE_DETAIL = (id: string | number) => `/movie/${id}`;
export const ROUTE_WISHLIST = '/wishlist';
