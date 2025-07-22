
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/movieApi';
import MovieCard from '../MovieCard/MovieCard';
import CategorySelector from './CategorySelector';
import type { Movie } from '../../types/movie';

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('popular');

    useEffect(() => {
        setLoading(true);
        fetchMovies(selectedCategory)
            .then(data => {
                setMovies(data.results || []);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setMovies([]);
            })
            .finally(() => setLoading(false));
    }, [selectedCategory]);

    if (loading) return <div>Loading</div>;
    if (error) return <div>Error{error}</div>;

    return (
        <>
            <CategorySelector
                selected={selectedCategory}
                onChange={setSelectedCategory}
            />
            <div className="movie-list">
                {movies.length === 0 ? (
                    <p>Aucun film trouvé.</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default MovieList;