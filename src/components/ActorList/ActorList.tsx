
import { useEffect, useState } from 'react';
import type { Actor } from '../../types/actor';
import styles from './ActorList.module.css';
import { TMDB_POSTER_W500 } from '../../constants/links';
import { LOADING_ACTORS, ERROR, NO_ACTOR_FOUND } from '../../constants/textKey';
import { fetchMovieCredits } from '../../services/movieApi';

interface Props {
  movieId: string | number;
}

const ActorList = ({ movieId }: Props) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieCredits(Number(movieId))
      .then(data => {
        setActors(data.cast.slice(0, 10));
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setActors([]);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <div>{LOADING_ACTORS}</div>;
  if (error) return <div>{ERROR} {error}</div>;
  if (!actors.length) return <div>{NO_ACTOR_FOUND}</div>;

  return (
    <div className={styles.actorsContainer}>
      {actors.map((actor) => (
        <div key={actor.id} className={styles.actorCard}>
          <img
            src={actor.profile_path ? TMDB_POSTER_W500(actor.profile_path) : '/no-profile.png'}
            alt={actor.name}
            className={styles.actorImg}
          />
          <span className={styles.actorName}>{actor.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ActorList;
