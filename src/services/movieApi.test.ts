import {
  fetchMovies,
  searchMovies,
  fetchMovieDetail,
  fetchMovieCredits,
  fetchSimilarMovies
} from './movieApi';

import { describe, it, expect } from 'vitest';

describe('movieApi service', () => {
  it('fetches popular movies', async () => {
    const data = await fetchMovies('popular');
    expect(data.results).toBeInstanceOf(Array);
  });

  it('searches for a movie', async () => {
    const data = await searchMovies('Matrix');
    expect(data.results).toBeInstanceOf(Array);
  });

  it('fetches movie detail', async () => {
    const data = await fetchMovieDetail(603);
    expect(data.title).toBeDefined();
  });

  it('fetches movie credits', async () => {
    const data = await fetchMovieCredits(603);
    expect(data.cast).toBeInstanceOf(Array);
  });

  it('fetches similar movies', async () => {
    const data = await fetchSimilarMovies(603);
    expect(data.results).toBeInstanceOf(Array);
  });
});
