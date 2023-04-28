import { faClock, faFire, faYenSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
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
      <div className="mr-1 mt-2 text-center text-2xl text-[#FBB87F]">
        マイレシピ
      </div>
      <div>
        {myrecipe.map((recipe) => (
          <div
            key={recipe.id}
            className="my-3 rounded-lg bg-[#FFFAF2] py-3 shadow-md hover:bg-[#FDF1DE] hover:text-orange-500 hover:shadow-lg"
          >
            <Link href={'/recipes/' + recipe.id}>
              <div
                onClick={() => {
                  console.log(recipe.id, '←このIDのレシピをクリックしました');
                }}
              >
                <div className="flex">
                  <Image
                    className="bottom-7 ml-3 h-24 w-32 rounded-lg border-2 border-solid border-[#FBB87F] object-cover"
                    alt="マイレシピ"
                    width={300}
                    height={200}
                    src={recipe.image}
                  />
                  <div className="flex flex-col">
                    <div>
                      （{recipe.id}）{recipe.title}
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} />
                      {recipe.time}分 / <FontAwesomeIcon icon={faYenSign} />
                      {recipe.price}円 / <FontAwesomeIcon icon={faFire} />
                      {recipe.calorie}kcal
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Myrecipe;
