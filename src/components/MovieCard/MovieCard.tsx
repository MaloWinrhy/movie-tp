
import styles from './MovieCard.module.css';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className={styles.card}>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/no-poster.png'}
        alt={movie.title}
        className={styles.poster}
      />
      <h3>{movie.title}</h3>
      <p>Note : {movie.vote_average}</p>
      <Link to={`/movie/${movie.id}`} className={styles.detailsBtn}>
        Voir les détails
      </Link>
    </div>
  );
};

export default MovieCard;
