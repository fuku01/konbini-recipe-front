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
  const [allRecipe, setAllRecipe] = useState<Recipe[]>([]);

  // レシピの取得
  const getRecipe = async () => {
    const response = await axios.get<Recipe[]>('/new_recipes');
    setAllRecipe(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getRecipe();
    console.log('レシピの取得に成功しました');
  }, []);

  return (
    <div>
      <div className="mt-2 text-2xl text-[#FBB87F]">新着レシピ</div>
      <div className="flex">
        <div className="flex overflow-x-scroll whitespace-nowrap">
          {allRecipe.map((recipe) => (
            <div key={recipe.id} className="mx-2 flex-shrink-0">
              <Link href={'/recipes/' + recipe.id}>
                <div
                  onClick={() => {
                    console.log(recipe.id, '←このIDのレシピをクリックしました');
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
  );
};
export default Home;
