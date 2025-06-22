import { useEffect, useState } from 'react';

export const useFavoriteShops = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favoriteShops');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favoriteShops', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (shopId) => {
    setFavorites((prev) =>
      prev.includes(shopId)
        ? prev.filter((id) => id !== shopId)
        : [...prev, shopId]
    );
  };

  const isFavorite = (shopId) => favorites.includes(shopId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
