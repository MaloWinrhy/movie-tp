

import { Routes, Route } from 'react-router';
import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import MovieDetail from './components/MovieDetail/MovieDetail';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Wishlist from './components/Wishlist/Wishlist';
import { useEffect, useState } from 'react';
import { TMDB_SEARCH_MOVIE } from './constants/links';


function App() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    if (search && search.trim() !== '') {
      setSearchLoading(true);
      setSearchError(null);
      fetch(TMDB_SEARCH_MOVIE(search.trim()))
        .then(res => res.json())
        .then(data => setSearchResults(data.results || []))
        .catch(err => setSearchError(err.message))
        .finally(() => setSearchLoading(false));
    } else {
      setSearchResults([]);
      setSearchError(null);
    }
  }, [search]);

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