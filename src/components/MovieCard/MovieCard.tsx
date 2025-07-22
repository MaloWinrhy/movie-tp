import { useRef, useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { Info, Plus, ThumbsUp, ThumbsDown, Check } from 'lucide-react';

import styles from './MovieCard.module.css';
import type { Movie } from '../../types/movie';
import {
  TMDB_POSTER_BASE,
  NO_POSTER_IMAGE,
  ROUTE_MOVIE_DETAIL,
  NOTE_LABEL,
} from '../../constants/links';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayPos, setOverlayPos] = useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 0 });
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setOverlayPos({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
      setShowOverlay(true);
    }
  };

  const handleMouseLeave = () => setShowOverlay(false);

  return (
    <>
      <div
        className={styles.card}
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={movie.poster_path ? `${TMDB_POSTER_BASE}${movie.poster_path}` : NO_POSTER_IMAGE}
          alt={movie.title}
          className={styles.poster}
        />
      </div>

      {showOverlay && createPortal(
        <div
          className={styles.overlay}
          style={{
            top: overlayPos.top - 60,
            left: overlayPos.left - 70,
            width: 340,
            height: 420,
            position: 'absolute',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={movie.poster_path ? `${TMDB_POSTER_BASE}${movie.poster_path}` : NO_POSTER_IMAGE}
            alt={movie.title}
            className={styles.overlayPoster}
          />
          <div className={styles.overlayContent}>
            <div className={styles.actionsRow}>
              <Link
                to={ROUTE_MOVIE_DETAIL(movie.id)}
                className={styles.actionBtn}
                title="Détails"
                aria-label="Voir les détails"
              >
                <Info />
              </Link>
              {wishlist.some((m) => m.id === movie.id) ? (
                <button
                  className={`${styles.actionBtn} ${styles.inWishlist}`}
                  title="Retirer de la wishlist"
                  aria-label="Retirer de la wishlist"
                  onClick={() => removeFromWishlist(movie.id)}
                >
                  <Check color="#e50914" size={32} />
                </button>
              ) : (
                <button
                  className={styles.actionBtn}
                  title="Ajouter à la wishlist"
                  aria-label="Ajouter à la wishlist"
                  onClick={() => addToWishlist(movie)}
                >
                  <Plus />
                </button>
              )}
              <button className={styles.actionBtn} title="J'aime">
                <ThumbsUp />
              </button>
              <button className={styles.actionBtn} title="Je n'aime pas">
                <ThumbsDown />
              </button>
            </div>
            <div className={styles.info}>
              <h3>{movie.title}</h3>
              <p>{NOTE_LABEL} {movie.vote_average}</p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default MovieCard;