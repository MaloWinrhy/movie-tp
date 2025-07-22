import { useEffect, useState } from 'react';
import type { Actor } from '../../types/actor';
import styles from './ActorList.module.css';

interface Props {
  movieId: string | number;
}

const ActorList = ({ movieId }: Props) => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      .then(res => res.json())
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

  if (loading) return <div>Chargement des acteurs...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (!actors.length) return <div>Aucun acteur trouvé.</div>;

  return (
    <div className={styles.actorsContainer}>
      {actors.map((actor) => (
        <div key={actor.id} className={styles.actorCard}>
          <img
            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/no-profile.png'}
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
