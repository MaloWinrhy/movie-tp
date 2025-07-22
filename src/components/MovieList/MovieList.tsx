import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

const categories = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const API_KEY = 'YOUR_API_KEY';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      let url = search
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`
        : `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    };
    fetchMovies();
  }, [category, search]);

  return (
    <div>
      <div className={styles.controls}>
        {categories.map((cat) => (
          <button key={cat.value} onClick={() => setCategory(cat.value)} className={category === cat.value ? styles.active : ''}>
            {cat.label}
          </button>
        ))}
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
