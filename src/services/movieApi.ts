

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchMovies(category: string) {
  const res = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=fr-FR`);
  if (!res.ok) throw new Error('[API_ERROR]FAILED_TO_FETCH_MOVIES');
  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('[API_ERROR]FAILED_TO_SEARCH_MOVIES');
  return res.json();
}

export async function fetchMovieDetail(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
  if (!res.ok) throw new Error('[API_ERROR]FAILED_TO_FETCH_MOVIE_DETAIL');
  return res.json();
}

export async function fetchMovieCredits(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr-FR`);
  if (!res.ok) throw new Error('[API_ERROR]FAILED_TO_FETCH_MOVIE_CREDITS');
  return res.json();
}

export async function fetchSimilarMovies(movieId: number) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=fr-FR`);
  if (!res.ok) throw new Error('[API_ERROR]FAILED_TO_FETCH_SIMILAR_MOVIES');
  return res.json();
}

export async function fetchMovieTrailer(movieId: number): Promise<string | null> {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
  if (!res.ok) return null;
  const data = await res.json();
  const trailer = data.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
  return trailer ? trailer.key : null;
}