import { useEffect, useRef, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';
import { TMDB_MOVIES_BY_CATEGORY } from '../../constants/links';

const categories = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
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

  // Création d’un dictionnaire de refs par catégorie
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
        fetch(TMDB_MOVIES_BY_CATEGORY(cat.value))
          .then(res => res.json())
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

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>;

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
              <p style={{ color: '#fff', marginLeft: '1rem' }}>Aucun film trouvé.</p>
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