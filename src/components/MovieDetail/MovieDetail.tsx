
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Movie } from '../../types/movie';
import { TMDB_MOVIE_DETAIL } from '../../constants/links';
import SimilarMovies from '../SimilarMovies/SimilarMovies';
import styles from './MovieDetail.module.css';
import ActorList from '../ActorList/ActorList';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        fetch(TMDB_MOVIE_DETAIL(id!))
            .then(res => res.json())
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!movie) return <div>No movie found.</div>;

    return (
        <div className={styles.detail}>
            <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '/no-poster.png'}
                alt={movie.title}
                className={styles.poster}
            />
            <div className={styles.info}>
                <h2>{movie.title}</h2>
                <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                <p><strong>Note moyenne :</strong> {movie.vote_average}</p>
                <p><strong>Résumé :</strong> {movie.overview}</p>
                <h3>Acteurs principaux</h3>
                <ActorList movieId={movie.id} />
                <h3>Similar movies</h3>
                <SimilarMovies movieId={movie.id} />
            </div>
        </div>
    );
}

export default MovieDetail;
