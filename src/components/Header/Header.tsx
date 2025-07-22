
import styles from './Header.module.css';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { ROUTE_HOME, ROUTE_WISHLIST } from '../../constants/links';

const Header = ({ onSearch }: { onSearch?: (q: string) => void }) => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== ROUTE_HOME) navigate(ROUTE_HOME);
    if (onSearch) onSearch(search);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={ROUTE_HOME} className={styles.logo}>Accueil</Link>
        <Link to={ROUTE_WISHLIST} className={styles.link}>Wishlist</Link>
      </nav>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={handleInput}
        />
        <button type="submit">🔍</button>
      </form>
    </header>
  );
};

export default Header;
