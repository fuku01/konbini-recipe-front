import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RecipeList from '@/components/RecipeList';
import { Pagy, favoritePagyState } from '@/state/pagy';

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

type RecipeResponse = {
  recipes: Recipe[]; // レシピの配列
  pagy: Pagy; // ページネーション情報
};

const FavoriteRecipe = () => {
  const [favorite, setFavorite] = useState<Recipe[]>([]);
  const [pagy, setPagy] = useRecoilState(favoritePagyState); // ページネーション情報を管理するステート(ページを維持するため)

  // マイレシピを取得する関数
  const getFavoriteRecipes = useCallback(
    async (page: number | null) => {
      try {
        const response = await axios.get<RecipeResponse>(
          `/favorite_recipes?page=${page}`
        );
        setFavorite(response.data.recipes);
        console.log('お気に入りレシピの取得に成功しました', response.data);
        setPagy(response.data.pagy); // ページネーション情報を更新する(ページを維持するため)
      } catch (error) {
        console.log('お気に入りレシピの取得に失敗しました', error);
      }
    },
    [setPagy]
  );

  useEffect(() => {
    getFavoriteRecipes(pagy.page); // ページネーション情報のページ番号を引数に渡して、マイレシピを取得する
  }, [getFavoriteRecipes, pagy.page]);

  return (
    <div>
      <RecipeList recipes={favorite} loginCheck={true} />
      <button
        disabled={pagy.prev === null}
        onClick={() => {
          getFavoriteRecipes(pagy.prev ?? 1); // ページネーション情報のprevを引数に渡してマイレシピを取得する、prevがnullの場合は1を渡す
        }}
      >
        前のページ
      </button>
      <span>{'　'}</span>
      <button
        disabled={pagy.next === null}
        onClick={() => {
          console.log(pagy);
          getFavoriteRecipes(pagy.next ?? pagy.last); // ページネーション情報のnextを引数に渡してマイレシピを取得する、nextがnullの場合はlastを渡す
        }}
      >
        次のページ
      </button>
    </div>
  );
};
export default FavoriteRecipe;
