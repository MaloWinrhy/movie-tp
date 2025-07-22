import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import styles from './SimilarMovies.module.css';
import { TMDB_POSTER_W500 } from '../../constants/links';
import MovieCard from '../MovieCard/MovieCard';
import { fetchSimilarMovies } from '../../services/movieApi';
import { LOADING_SIMILAR, ERROR, NO_SIMILAR_FOUND } from '../../constants/textKey';

interface Props {
  movieId: string | number;
}

const SimilarMovies = ({ movieId }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchSimilarMovies(Number(movieId))
      .then(data => {
        setMovies(data.results || []);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <div>{LOADING_SIMILAR}</div>;
  if (error) return <div>{ERROR} {error}</div>;
  if (!movies.length) return <div>{NO_SIMILAR_FOUND}</div>;

  return (
    <div className={styles.similarContainer}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default SimilarMovies;
