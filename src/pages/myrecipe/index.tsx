import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import RecipeList from '@/components/RecipeList';
import useAuth from '@/hooks/auth/useAuth';
import { Pagy, myPagyState } from '@/state/pagy';

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

const Myrecipe = () => {
  const [myrecipe, setMyrecipe] = useState<Recipe[]>([]);
  const [pagy, setPagy] = useRecoilState(myPagyState); // ページネーション情報を管理するステート(ページを維持するため)
  const [canClick, setCanClick] = useState<boolean>(true); // ページネーションのボタンを連打できないようにするためのステート
  const { token } = useAuth();

  // マイレシピを取得する関数
  const getMyrecipes = useCallback(
    async (page: number | null) => {
      if (!token) return;
      try {
        const response = await axios.get<RecipeResponse>(
          `/my_recipes?page=${page}`
        );
        setMyrecipe(response.data.recipes);
        setPagy(response.data.pagy); // ページネーション情報を更新する(ページを維持するため)
      } catch (error) {
        console.log('マイレシピの取得に失敗しました', error);
      }
    },
    [setPagy, token]
  );

  useEffect(() => {
    getMyrecipes(pagy.page); // ページネーション情報のページ番号を引数に渡して,マイレシピを取得する
  }, [getMyrecipes, pagy.page]);

  return (
    <div className="select-none">
      {token && <RecipeList recipes={myrecipe} loginCheck={true} />}
      {myrecipe && myrecipe.length > 0 ? (
        <div className="mt-5 text-center font-semibold">
          <button
            className="cursor-pointer rounded-md px-1 py-0.5 font-semibold hover:bg-[#FDF1DE] hover:text-orange-500 hover:underline active:scale-105 disabled:pointer-events-none disabled:bg-opacity-0 disabled:text-gray-400 disabled:no-underline"
            disabled={pagy.prev === null || canClick === false}
            onClick={() => {
              if (canClick) {
                setCanClick(false);
                setTimeout(() => {
                  setCanClick(true);
                }, 500);
                getMyrecipes(pagy.prev ?? 1); // ページネーション情報のprevを引数に渡してマイレシピを取得する、prevがnullの場合は1を渡す
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
            disabled={pagy.next === null || canClick === false}
            onClick={() => {
              if (canClick) {
                setCanClick(false);
                setTimeout(() => {
                  setCanClick(true);
                }, 500);
                getMyrecipes(pagy.next ?? pagy.last); // ページネーション情報のnextを引数に渡してマイレシピを取得する、nextがnullの場合はlastを渡す
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
export default Myrecipe;
