import { useEffect, useState } from 'react';
import { getAllRecipes } from '../services/recipesApi';
import { getFavorites } from '../services/favoritesApi';
import FavoriteButton from '../components/FavoriteButton';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recipesRes, favsRes] = await Promise.all([getAllRecipes(), getFavorites()]);
      setRecipes(recipesRes.data);
      setFavoriteIds(favsRes.data.map((fav: any) => fav.recipeId));
    } catch (err) {
      console.error('Error loading recipes:', err);
    }
  };

  const toggleFavorite = (recipeId: number) => {
    setFavoriteIds((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <FavoriteButton
            recipeId={recipe.id}
            isFavorite={favoriteIds.includes(recipe.id)}
            onToggle={() => toggleFavorite(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
}
