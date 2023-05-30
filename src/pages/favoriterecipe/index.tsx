import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RecipeList from '@/components/RecipeList';
import useAuth from '@/hooks/auth/useAuth';
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
  const [canClick, setCanClick] = useState<boolean>(true); // ページネーションのボタンを連打できないようにするためのステート
  const { token } = useAuth();

  // マイレシピを取得する関数
  const getFavoriteRecipes = useCallback(
    async (page: number | null) => {
      if (!token) return;
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
    [setPagy, token]
  );

  useEffect(() => {
    getFavoriteRecipes(pagy.page); // ページネーション情報のページ番号を引数に渡して、マイレシピを取得する
  }, [getFavoriteRecipes, pagy.page]);

  return (
    <div className="select-none">
      {token && <RecipeList recipes={favorite} loginCheck={true} />}
      {favorite && favorite.length > 0 ? (
        <div className="mt-5 text-center font-semibold ">
          <button
            className="cursor-pointer rounded-md px-1 py-0.5 font-semibold hover:bg-[#FDF1DE] hover:text-orange-500 hover:underline active:scale-105 disabled:pointer-events-none disabled:bg-opacity-0 disabled:text-gray-400 disabled:no-underline"
            disabled={pagy.prev === null}
            onClick={() => {
              if (canClick) {
                setCanClick(false);
                setTimeout(() => {
                  setCanClick(true);
                }, 400);
                getFavoriteRecipes(pagy.prev ?? 1); // ページネーション情報のprevを引数に渡してマイレシピを取得する、prevがnullの場合は1を渡す
              }
            }}
          >
            前のページ
          </button>
          <span className="mx-5">
            {pagy.page} / {pagy.last}
          </span>
          <button
            className="cursor-pointer rounded-md px-1 py-0.5 font-semibold hover:bg-[#FDF1DE] hover:text-orange-500 hover:underline active:scale-105 disabled:pointer-events-none disabled:bg-opacity-0 disabled:text-gray-400 disabled:no-underline"
            disabled={pagy.next === null}
            onClick={() => {
              if (canClick) {
                setCanClick(false);
                setTimeout(() => {
                  setCanClick(true);
                }, 400);
                console.log(pagy);
                getFavoriteRecipes(pagy.next ?? pagy.last); // ページネーション情報のnextを引数に渡してマイレシピを取得する、nextがnullの場合はlastを渡す
              }
            }}
          >
            次のページ
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default FavoriteRecipe;
