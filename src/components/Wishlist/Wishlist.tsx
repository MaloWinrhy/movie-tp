import { useWishlist } from '../../context/WishlistContext';
import styles from './Wishlist.module.css';
import MovieCard from '../MovieCard/MovieCard';
import { WISHLIST_TITLE, WISHLIST_EMPTY } from '../../constants/textKey';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className={styles.gridWrap}>
      <h2 className={styles.title}>{WISHLIST_TITLE}</h2>
      {wishlist.length === 0 ? (
        <p className={styles.status}>{WISHLIST_EMPTY}</p>
      ) : (
        <div className={styles.grid}>
          {wishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
