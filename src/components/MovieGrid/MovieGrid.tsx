import { useState, useEffect } from 'react';
import styles from './MovieGrid.module.css';
import MovieCard from '../MovieCard/MovieCard';
import {
  SEARCH_RESULTS,
  LOADING,
  ERROR,
  NO_MOVIE_FOUND,
  PREVIOUS,
  NEXT,
  PAGE
} from '../../constants/textKey';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
}

const PAGE_SIZE = 10;

const MovieGrid = ({ movies, loading, error }: MovieGridProps) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [movies]);

  const totalPages = Math.ceil(movies.length / PAGE_SIZE);
  const paginatedMovies = movies.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className={styles.gridWrap}>
      <h2 className={styles.title}>{SEARCH_RESULTS}</h2>
      {loading ? (
        <p className={styles.status}>{LOADING}</p>
      ) : error ? (
        <p className={styles.status}>{ERROR} {error}</p>
      ) : movies.length === 0 ? (
        <p className={styles.status}>{NO_MOVIE_FOUND}</p>
      ) : (
        <>
          <div className={styles.grid}>
            {paginatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={page === 1}>
              {PREVIOUS}
            </button>
            <span>
              {PAGE} {page} / {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              {NEXT}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieGrid;