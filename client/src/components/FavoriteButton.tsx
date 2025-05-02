import { useState } from 'react';
import { addFavorite, removeFavorite } from '../services/favoritesApi';

interface Props {
  recipeId: number;
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ recipeId, isFavorite, onToggle }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(recipeId);
      } else {
        await addFavorite(recipeId);
      }
      onToggle();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {isFavorite ? '❤️ Remove' : '🤍 Add to Favorites'}
    </button>
  );
}
