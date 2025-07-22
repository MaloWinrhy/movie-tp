import { useEffect, useRef, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';
import { fetchMovies } from '../../services/movieApi';
import {
  NOW_PLAYING_LABEL,
  POPULAR_LABEL,
  TOP_RATED_LABEL,
  UPCOMING_LABEL,
  NO_MOVIE_FOUND,
  LOADING,
  ERROR
} from '../../constants/textKey';

const categories = [
  { label: NOW_PLAYING_LABEL, value: 'now_playing' },
  { label: POPULAR_LABEL, value: 'popular' },
  { label: TOP_RATED_LABEL, value: 'top_rated' },
  { label: UPCOMING_LABEL, value: 'upcoming' },
];

import type { Movie } from '../../types/movie';

type CategoryMovies = {
  [key: string]: Movie[];
};

type MovieListProps = {
  search?: string;
};

const MovieList = ({ search }: MovieListProps) => {
  const [moviesByCategory, setMoviesByCategory] = useState<CategoryMovies>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleScroll = (key: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[key];
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all(
      categories.map(cat =>
        fetchMovies(cat.value)
          .then(data => ({ [cat.value]: data.results || [] }))
      )
    )
      .then(results => {
        const merged: CategoryMovies = {};
        results.forEach(obj => Object.assign(merged, obj));
        setMoviesByCategory(merged);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setMoviesByCategory({});
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>{LOADING}</div>;
  if (error) return <div>{ERROR} {error}</div>;

  return (
    <div>
      {categories.map(cat => {
        let movies = moviesByCategory[cat.value] || [];

        if (search && search.trim() !== '') {
          const q = search.trim().toLowerCase();
          movies = movies.filter(m => m.title.toLowerCase().includes(q));
        }

        return (
          <div key={cat.value} className={styles.movieList}>
            <div className={styles.movieListTitleWrap}>
              <h2 className={styles.title}>{cat.label}</h2>
            </div>

            {movies.length === 0 ? (
              <p style={{ color: '#fff', marginLeft: '1rem' }}>{NO_MOVIE_FOUND}</p>
            ) : (
              <div className={styles.scrollWrap}>
                <button
                  className={styles.scrollBtn}
                  onClick={() => handleScroll(cat.value, 'left')}
                  aria-label="Défiler vers la gauche"
                >
                  ◀
                </button>

                <div
                  ref={el => { scrollRefs.current[cat.value] = el; }}
                  className={styles.cardsContainer}
                >
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                <button
                  className={styles.scrollBtn}
                  onClick={() => handleScroll(cat.value, 'right')}
                  aria-label="Défiler vers la droite"
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;