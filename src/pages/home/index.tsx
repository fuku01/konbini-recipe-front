import {
  faCrown,
  faHeart,
  faMedal,
  faSeedling,
} from '@fortawesome/free-solid-svg-icons';
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
  };
  useEffect(() => {
    getNewRecipe();
  }, []);

  // 人気レシピを取得する関数
  const getRankRecipe = async () => {
    const response = await axios.get<Recipe[]>('/rank_recipes');
    setRankRecipe(response.data);
  };
  useEffect(() => {
    getRankRecipe();
  }, []);

  // いいねの数字を見やすくする関数(Kとかつける。　※最大9.9Kまで表示)
  const formatNumber = (num: number) => {
    if (num >= 9950) {
      return '9.9k';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num;
    }
  };

  // faMedalの色を変える関数
  const GetMedalColor = (index: number) => {
    if (index === 0) {
      return 'text-[#FFD700] border-[#FFD700]';
    } else if (index === 1) {
      return 'text-[#C0C0C0] border-[#C0C0C0]';
    } else if (index === 2) {
      return 'text-[#9E7642] border-[#9E7642]';
    }
  };

  return (
    <div className="mt-3 select-none">
      {/* ----------------------人気レシピの表示------------------------ */}
      <div>
        <div>
          <span className="rounded-full bg-[#FDF1DE] px-5 py-1 text-xl font-medium shadow-md">
            <FontAwesomeIcon
              icon={faCrown}
              className="mr-2 text-2xl text-[#FFD700] "
            />
            人気ランキング
          </span>
        </div>
        <div className="flex">
          <div className="flex overflow-x-auto overscroll-x-none scroll-smooth whitespace-nowrap">
            {rankRecipe.map((recipe, index) => (
              <div key={recipe.id} className="mx-2.5 mt-6 flex-shrink-0">
                <Link href={'/recipes/' + recipe.id}>
                  <div className="relative mx-auto h-44 w-60">
                    <img
                      className="relative h-full w-full rounded-2xl border-4 border-solid border-[#FBB87F] object-cover hover:border-orange-500"
                      alt="人気レシピ"
                      src={recipe.image}
                    />
                    {/* お気に入りボタン */}
                    <div className="absolute bottom-0 right-0 flex items-center space-x-1 rounded-br-xl rounded-tl-xl bg-[#FDF1DE] px-1.5 py-1.5">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-sm text-[#ef6a6d]"
                      />
                      {/* お気に入りの数を表示 */}
                      <div className="text-center text-xs font-semibold">
                        {formatNumber(recipe.favorites_count)}
                      </div>
                    </div>
                    {/* ランキング順番を表示 */}
                    <div>
                      {/* ランキング上位３のみアイコンを表示する */}
                      {index < 3 && (
                        <FontAwesomeIcon
                          icon={faMedal}
                          className={
                            'absolute -right-1.5 -top-1.5 rounded-full border-2 border-double bg-[#fcf7ef] px-1.5 pb-1 pt-2 text-3xl ' +
                            GetMedalColor(index)
                          }
                        />
                      )}
                      <span className="absolute left-0 top-0 rounded-br-xl rounded-tl-xl bg-[#FDF1DE] px-3 py-1 text-xl font-extrabold ">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ------------------------新着レシピの表示 ---------------------------*/}
      <div>
        <div className="mb-6 mt-16">
          <span className="rounded-full bg-[#FDF1DE] px-5 py-1 text-xl font-medium shadow-md">
            <FontAwesomeIcon
              icon={faSeedling}
              className="mr-2 text-2xl text-[#94C8AD]"
            />
            新着レシピ
          </span>
        </div>
        <div className="flex">
          <div className="flex overflow-x-auto overscroll-x-none scroll-smooth whitespace-nowrap">
            {newRecipe.map((recipe) => (
              <div key={recipe.id} className="mx-2 flex-shrink-0">
                <Link href={'/recipes/' + recipe.id}>
                  <div>
                    <img
                      className="h-24 w-32 rounded-lg border-4 border-solid border-[#FBB87F] object-cover hover:border-orange-500"
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
