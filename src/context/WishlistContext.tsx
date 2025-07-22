

import { createContext, useContext } from 'react';
import type { Movie } from '../types/movie.d';

export interface WishlistContextType {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (id: number) => void;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
