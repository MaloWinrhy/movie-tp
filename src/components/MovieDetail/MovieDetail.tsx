
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Movie } from '../../types/movie';
import { TMDB_YOUTUBE_EMBED, TMDB_BACKDROP_ORIGINAL, TMDB_POSTER_W500 } from '../../constants/links';
import { fetchMovieDetail, fetchMovieTrailer } from '../../services/movieApi';
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import styles from './MovieDetail.module.css';
import ActorList from '../ActorList/ActorList';
import {
  LOADING,
  ERROR,
  NO_MOVIE_FOUND,
  TRAILER,
  RELEASE_DATE,
  NOTE_LABEL,
  MAIN_ACTORS,
  SIMILAR_MOVIES
} from '../../constants/textKey';


const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchMovieDetail(Number(id!))
      .then(data => {
        setMovie(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setMovie(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!movie?.id) return;
    fetchMovieTrailer(movie.id)
      .then((trailerKey: string | null) => setTrailerKey(trailerKey))
      .catch(() => setTrailerKey(null));
  }, [movie?.id]);

  if (loading) return <div className={styles.loading}>{LOADING}</div>;
  if (error) return <div className={styles.error}>{ERROR} {error}</div>;
  if (!movie) return <div className={styles.error}>{NO_MOVIE_FOUND}</div>;

    return (
      <>
        <div className={styles.movieHero} style={{
          backgroundImage: !trailerKey && movie.backdrop_path
            ? `linear-gradient(rgba(20,20,20,0.7) 60%,rgba(20, 20, 20, 0.34) 100%), url(${TMDB_BACKDROP_ORIGINAL(movie.backdrop_path)})`
            : undefined,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {trailerKey && (
            <div className={styles.trailerBg}>
              <iframe
                src={TMDB_YOUTUBE_EMBED(trailerKey)}
                title={TRAILER}
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder={0}
                className={styles.trailerIframe}
              />
              <div className={styles.trailerOverlay} />
            </div>
          )}
          <div className={styles.heroContent}>
            <img
              src={movie.poster_path ? TMDB_POSTER_W500(movie.poster_path) : '/no-poster.png'}
              alt={movie.title}
              className={styles.heroPoster}
            />
            <div className={styles.heroInfo}>
              <h1 className={styles.heroTitle}>{movie.title}</h1>
              <div className={styles.heroMeta}>
                <span><strong>{RELEASE_DATE}</strong> {movie.release_date}</span>
                <span><strong>{NOTE_LABEL}</strong> {movie.vote_average}</span>
              </div>
              <p className={styles.heroOverview}>{movie.overview}</p>
            </div>
          </div>
        </div>

            <div className={styles.section}>
              <h3>{MAIN_ACTORS}</h3>
              <div className={styles.horizontalRow}>
                <div className={styles.actorGrid}>
                  <ActorList movieId={movie.id} />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <h3>{SIMILAR_MOVIES}</h3>
              <div className={styles.horizontalRow}>
                <div className={styles.similarGrid}>
                  <SimilarMovies movieId={movie.id} />
                </div>
              </div>
            </div>
      </>
    );
}

export default MovieDetail;
