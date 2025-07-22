import { useWishlist } from '../../context/WishlistContext';
import styles from './Wishlist.module.css';
import MovieCard from '../MovieCard/MovieCard';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className={styles.gridWrap}>
      <h2 className={styles.title}>Ma Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className={styles.status}>Aucun film dans la wishlist.</p>
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
