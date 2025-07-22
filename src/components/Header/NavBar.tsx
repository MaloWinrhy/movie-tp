import { Link } from 'react-router';
import styles from './Header.module.css';
import { ROUTE_HOME, ROUTE_WISHLIST } from '../../constants/routes';
import { ACCUEIL, WISHLIST } from '../../constants/textKey';

const NavBar = () => (
  <nav className={styles.nav}>
    <Link to={ROUTE_HOME} className={styles.logo}>{ACCUEIL}</Link>
    <Link to={ROUTE_WISHLIST} className={styles.link}>{WISHLIST}</Link>
  </nav>
);

export default NavBar;
