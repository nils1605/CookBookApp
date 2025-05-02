import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites');
        setFavorites(response.data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold">Favorites</h2>
      <ul>
        {favorites.map((recipe: any) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
