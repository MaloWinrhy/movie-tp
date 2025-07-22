const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(category: string) {
  const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('[API_ERROR]failedToFetchMovies');
  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('[API_ERROR]failedToSearchMovies');
  return res.json();
}

export async function fetchMovieDetail(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('[API_ERROR]failedToFetchMovieDetail');
  return res.json();
}

export async function fetchMovieCredits(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('[API_ERROR]failedToFetchMovieCredits');
  return res.json();
}

export async function fetchSimilarMovies(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('[API_ERROR]failedToFetchSimilarMovies');
  return res.json();
}
