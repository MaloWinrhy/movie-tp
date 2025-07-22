

import styles from './Header.module.css';
import { useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { ROUTE_HOME } from '../../constants/routes';
import NavBar from './NavBar';
import SearchBar from './SearchBar';



const Header = ({ onSearch }: { onSearch?: (q: string) => void }) => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleInput = (value: string) => {
    setSearch(value);
    if (onSearch) onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== ROUTE_HOME) navigate(ROUTE_HOME);
    if (onSearch) onSearch(search);
  };

  return (
    <header className={styles.header}>
      <NavBar />
      <SearchBar value={search} onChange={handleInput} onSubmit={handleSubmit} />
    </header>
  );
};

export default Header;
