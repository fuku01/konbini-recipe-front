import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import RecipeList from '@/components/RecipeList';

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  time: number;
  calorie: number;
  image: string;
  created_at: Date;
  updated_at: Date;
  price: number;
  favorites_count: number;
};

const FavoriteRecipe = () => {
  const [favorite, setFavorite] = useState<Recipe[]>([]);

  // マイレシピを取得する関数
  const getFavoriteRecipes = useCallback(async () => {
    try {
      const response = await axios.get<Recipe[]>('/favorite_recipes');
      setFavorite(response.data);
      console.log('お気に入りレシピの取得に成功しました', response.data);
    } catch (error) {
      console.log('お気に入りレシピの取得に失敗しました', error);
    }
  }, []);

  useEffect(() => {
    getFavoriteRecipes();
  }, [getFavoriteRecipes]);

  return <RecipeList recipes={favorite} loginCheck={true} />;
};
export default FavoriteRecipe;
