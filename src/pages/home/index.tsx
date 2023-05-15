import { faCrown, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  favorites_count: number;
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

  // いいねの数字を見やすくする関数(Kとかつける。　※最大9.9Kまで表示)
  const formatNumber = (num: number) => {
    if (num >= 9950) {
      return '9.9k〜';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num;
    }
  };

  return (
    <div>
      {/* 人気レシピの表示 */}
      <div>
        <div className="mb-2 mr-2 rounded-lg bg-[#FDF1DE] py-1 pl-4 text-2xl font-bold text-orange-500">
          <FontAwesomeIcon icon={faCrown} className="mr-2 text-[#FBD87F]" />
          人気ランキング
        </div>
        <div className="flex">
          <div className="flex overflow-x-scroll whitespace-nowrap">
            {rankRecipe.map((recipe) => (
              <div key={recipe.id} className="mx-2 flex-shrink-0">
                <Link href={'/recipes/' + recipe.id}>
                  <div
                    className="relative mx-auto h-52 w-72"
                    onClick={() => {
                      console.log(
                        recipe.id,
                        '←このIDのレシピをクリックしました'
                      );
                    }}
                  >
                    <img
                      className="relative h-full w-full rounded-3xl border-2 border-solid border-[#FBB87F] object-cover hover:border-4 hover:border-orange-500"
                      alt="人気レシピ"
                      src={recipe.image}
                    />
                    {/* お気に入りボタンの処理 */}
                    <div className="absolute bottom-2 right-2 rounded-2xl bg-[#FDF1DE] bg-opacity-80 px-2 py-1">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-4xl text-[#ef6a6d]"
                      />
                      {/* お気に入りの数を表示 */}
                      <div className="text-center text-xs font-semibold">
                        {formatNumber(recipe.favorites_count)}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 新着レシピの表示 */}
      <div>
        <div className="mb-2 mr-2 mt-8 rounded-lg bg-[#FDF1DE] py-1 pl-4 text-2xl font-bold text-orange-500">
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
                      alt="新着レシピ"
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
