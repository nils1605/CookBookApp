import React, { useState } from 'react';
import api from '../utils/api';

const CreateRecipePage = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleCreateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/recipes', {
        name,
        ingredients: ingredients.split(','),
        instructions,
        thumbnail_url: thumbnailUrl,
      });
      console.log('Recipe created:', response.data);
      // Redirect or show success message
    } catch (err) {
      console.error('Error creating recipe:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Create Recipe</h2>
      <form onSubmit={handleCreateRecipe} className="space-y-4">
        <div>
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnail"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
