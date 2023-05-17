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

const Myrecipe = () => {
  const [myrecipe, setMyrecipe] = useState<Recipe[]>([]);

  // マイレシピを取得する関数
  const getMyrecipes = useCallback(async () => {
    try {
      const response = await axios.get<Recipe[]>('/my_recipes');
      setMyrecipe(response.data);
      console.log('マイレシピの取得に成功しました', response.data);
    } catch (error) {
      console.log('マイレシピの取得に失敗しました', error);
    }
  }, []);

  useEffect(() => {
    getMyrecipes();
  }, [getMyrecipes]);

  return <RecipeList recipes={myrecipe} loginCheck={true} />;
};
export default Myrecipe;
