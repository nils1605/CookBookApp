import { useEffect, useState } from 'react';
import axios from 'axios';

const [searchTerm, setSearchTerm] = useState('');
const [suggestions, setSuggestions] = useState<string[]>([]);

useEffect(() => {
  const fetchSuggestions = async () => {
    if (searchTerm.length < 3) return;
    try {
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchTerm}`
      );
      const titles = res.data.data.recipes.map((r: any) => r.title);
      setSuggestions(titles.slice(0, 5));
    } catch (err) {
      setSuggestions([]);
    }
  };
  fetchSuggestions();
}, [searchTerm]);
