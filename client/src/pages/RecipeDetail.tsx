import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Recipe } from '../types/recipe';
import { useAuth } from '../context/AuthContext'; // Correct for default export


export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    axios.get(`/recipes/${id}`).then((res) => setRecipe(res.data));
  }, [id]);

  useEffect(() => {
    if (token) {
      axios
        .get('/favorites', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setIsFavorite(res.data.some((fav: Recipe) => fav.id === id));
        });
    }
  }, [id, token]);

  const toggleFavorite = () => {
    const method = isFavorite ? 'delete' : 'post';
    axios[method](`/favorites/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => setIsFavorite(!isFavorite));
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await axios.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Recipe deleted successfully!');
      navigate('/');
    } catch (err) {
      alert('Error deleting recipe or permission denied.');
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.name}</h2>
      <img src={recipe.thumbnail_url} alt={recipe.name} width={200} />
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Posted on:</strong> {new Date(recipe.posted_at).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

      <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
        Delete Recipe
      </button>
    </div>
  );
}
