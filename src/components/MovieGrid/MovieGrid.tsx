import styles from './MovieGrid.module.css';
import MovieCard from '../MovieCard/MovieCard';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
}

const MovieGrid = ({ movies, loading, error }: MovieGridProps) => (
  <div className={styles.gridWrap}>
    <h2 className={styles.title}>Résultats de recherche</h2>
    {loading ? (
      <p className={styles.status}>Recherche...</p>
    ) : error ? (
      <p className={styles.status}>Erreur : {error}</p>
    ) : movies.length === 0 ? (
      <p className={styles.status}>Aucun film trouvé.</p>
    ) : (
      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    )}
  </div>
);

export default MovieGrid;
