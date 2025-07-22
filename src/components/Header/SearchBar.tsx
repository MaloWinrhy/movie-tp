import styles from './Header.module.css';
import { SEARCH_PLACEHOLDER } from '../../constants/textKey';

const SearchBar = ({ value, onChange, onSubmit }: { value: string; onChange: (v: string) => void; onSubmit: (e: React.FormEvent) => void }) => (
  <form className={styles.searchBar} onSubmit={onSubmit}>
    <input
      type="text"
      placeholder={SEARCH_PLACEHOLDER}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <button type="submit">🔍</button>
  </form>
);

export default SearchBar;
