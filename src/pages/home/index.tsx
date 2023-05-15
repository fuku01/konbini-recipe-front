import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
};

const Home = () => {
  const [rankRecipe, setRankRecipe] = useState<Recipe[]>([]);
  const [newRecipe, setNewRecipe] = useState<Recipe[]>([]);

  // 新着レシピを取得する関数
  const getNewRecipe = async () => {
    const response = await axios.get<Recipe[]>('/new_recipes');
    setNewRecipe(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getNewRecipe();
    console.log('新着レシピの取得に成功しました');
  }, []);

  // 人気レシピを取得する関数
  const getRankRecipe = async () => {
    const response = await axios.get<Recipe[]>('/rank_recipes');
    setRankRecipe(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    getRankRecipe();
    console.log('人気レシピの取得に成功しました');
  }, []);

  return (
    <div>
      {/* 人気レシピの表示 */}
      <div>
        <div className="mb-1 mt-2 text-2xl font-bold text-orange-500">
          人気レシピランキング
        </div>
        <div className="flex">
          <div className="flex overflow-x-scroll whitespace-nowrap">
            {rankRecipe.map((recipe) => (
              <div key={recipe.id} className="mx-2 flex-shrink-0">
                <Link href={'/recipes/' + recipe.id}>
                  <div
                    onClick={() => {
                      console.log(
                        recipe.id,
                        '←このIDのレシピをクリックしました'
                      );
                    }}
                    className="mx-auto mb-3 h-52 w-72"
                  >
                    <img
                      className="h-full w-full rounded-3xl border-2 border-solid border-[#FBB87F] object-cover hover:border-4 hover:border-orange-500"
                      alt="マイレシピ"
                      width={128}
                      height={96}
                      src={recipe.image}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 新着レシピの表示 */}
      <div>
        <div className="mb-1 mt-2 text-2xl font-bold text-orange-500">
          新着レシピ
        </div>
        <div className="flex">
          <div className="flex overflow-x-scroll whitespace-nowrap">
            {newRecipe.map((recipe) => (
              <div key={recipe.id} className="mx-2 flex-shrink-0">
                <Link href={'/recipes/' + recipe.id}>
                  <div
                    onClick={() => {
                      console.log(
                        recipe.id,
                        '←このIDのレシピをクリックしました'
                      );
                    }}
                  >
                    <img
                      className="h-24 w-32 rounded-lg border-2 border-solid border-[#FBB87F] object-cover hover:border-4 hover:border-orange-500"
                      alt="マイレシピ"
                      width={128}
                      height={96}
                      src={recipe.image}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
