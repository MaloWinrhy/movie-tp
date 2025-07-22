

import { Routes, Route } from 'react-router';
import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Wishlist from './components/Wishlist/Wishlist';
import { useEffect, useState } from 'react';
import { searchMovies } from './services/movieApi';


function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.trim() !== '') {
      setSearchLoading(true);
      setSearchError(null);
      searchMovies(debouncedSearch.trim())
        .then(data => setSearchResults(data.results || []))
        .catch(err => setSearchError(err.message))
        .finally(() => setSearchLoading(false));
    } else {
      setSearchResults([]);
      setSearchError(null);
    }
  }, [debouncedSearch]);


return (
  <>
    <Header onSearch={setSearch} />
    <main className="mainWrap">
      <Routes>
        <Route
          path="/"
          element={
            search && search.trim() !== '' ? (
              <MovieGrid movies={searchResults} loading={searchLoading} error={searchError} />
            ) : (
              <MovieList />
            )
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </main>
  </>
);
}

export default App;