import { useEffect, useState } from 'react';
import type { Movie } from '../../types/movie';
import styles from './SimilarMovies.module.css';
import { TMDB_MOVIE_SIMILAR } from '../../constants/links';

interface Props {
  movieId: string | number;
}

const SimilarMovies = ({ movieId }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(TMDB_MOVIE_SIMILAR(movieId))
      .then(res => res.json())
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

  if (loading) return <div>Loading similar movies...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movies.length) return <div>No similar movies found.</div>;

  return (
    <div className={styles.similarContainer}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.similarCard}>
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : '/no-poster.png'}
            alt={movie.title}
            className={styles.similarImg}
          />
          <span className={styles.similarTitle}>{movie.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SimilarMovies;
