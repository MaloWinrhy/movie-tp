import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { WishlistContext } from './WishlistContext';
import type { WishlistContextType } from './WishlistContext';
import type { Movie } from '../types/movie.d';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Movie[]>(() => {
    const stored = localStorage.getItem('wishlist');
    const parsed = stored ? JSON.parse(stored) : [];
    console.log('[WishlistProvider] Initial wishlist from localStorage:', parsed);
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    console.log('[WishlistProvider] Wishlist updated:', wishlist);
  }, [wishlist]);

  const addToWishlist = (movie: Movie) => {
    setWishlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      return exists ? prev : [...prev, movie];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => {
      return prev.filter((m) => m.id !== id);
    });
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
