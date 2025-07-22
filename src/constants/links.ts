
export const TMDB_YOUTUBE_EMBED = (key: string) =>
  `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${key}`;

export const TMDB_BACKDROP_ORIGINAL = (path: string) =>
  `https://image.tmdb.org/t/p/original${path}`;

export const TMDB_POSTER_W500 = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w200';


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



