import { useRef, useState } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { Info, Plus, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import ActionButton from './ActionButton';

import styles from './MovieCard.module.css';
import type { Movie } from '../../types/movie';
import {
  ROUTE_MOVIE_DETAIL,
} from '../../constants/routes';
import {
  NO_POSTER_IMAGE,
  NOTE_LABEL,
  DETAILS_LABEL,
  ADD_WISHLIST,
  REMOVE_WISHLIST,
  LIKE,
  DISLIKE
} from '../../constants/textKey';
import { TMDB_POSTER_BASE } from '../../constants/links';

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
              <ActionButton
                isLink
                to={ROUTE_MOVIE_DETAIL(movie.id)}
                icon={<Info />}
                title={DETAILS_LABEL}
                ariaLabel={DETAILS_LABEL}
              />
              {wishlist.some((m) => m.id === movie.id) ? (
                <ActionButton
                  icon={<Check color="#e50914" size={32} />}
                  title={REMOVE_WISHLIST}
                  ariaLabel={REMOVE_WISHLIST}
                  onClick={() => removeFromWishlist(movie.id)}
                  className={styles.inWishlist}
                />
              ) : (
                <ActionButton
                  icon={<Plus />}
                  title={ADD_WISHLIST}
                  ariaLabel={ADD_WISHLIST}
                  onClick={() => addToWishlist(movie)}
                />
              )}
              <ActionButton
                icon={<ThumbsUp />}
                title={LIKE}
                ariaLabel={LIKE}
              />
              <ActionButton
                icon={<ThumbsDown />}
                title={DISLIKE}
                ariaLabel={DISLIKE}
              />
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