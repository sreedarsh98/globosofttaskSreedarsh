import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteJobs');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(jobId => jobId !== id)
        : [...prev, id];
      localStorage.setItem('favoriteJobs', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};