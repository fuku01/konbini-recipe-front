import { faFileLines } from '@fortawesome/free-solid-svg-icons';
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
};

const Myrecipe = () => {
  const [myrecipe, setMyrecipe] = useState<Recipe[]>([]);

  const getMyrecipes = () => {
    axios
      .get<Recipe[]>('/user_recipes')
      .then((response) => {
        setMyrecipe(response.data);
        console.log('マイレシピの取得に成功しました', response.data);
      })
      .catch((error) => {
        console.log('マイレシピの取得に失敗しました', error);
      });
  };
  useEffect(() => {
    getMyrecipes();
  }, []);

  return (
    <div>
      <div className="text-center text-[#FBB87F]">
        <FontAwesomeIcon icon={faFileLines} className="text-6xl" />
        <div className="mr-1 mt-2 text-2xl">マイレシピ</div>
      </div>
      <div>
        {myrecipe.map((recipe) => (
          <div
            key={recipe.id}
            className="my-3 rounded-lg bg-[#FFFAF2] py-5 shadow-md hover:bg-[#FDF1DE] hover:text-orange-500 hover:shadow-lg"
          >
            <Link href={'/recipes/' + recipe.id}>
              <div
                onClick={() => {
                  console.log(recipe.id, '←このIDのレシピをクリックしました');
                }}
              >
                （{recipe.id}）{recipe.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Myrecipe;
