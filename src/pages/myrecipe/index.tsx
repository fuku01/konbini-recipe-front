import { faClock, faFire, faYenSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/auth/useAuth';

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
  const { currentUser } = useAuth();

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

  if (currentUser) {
    return (
      <div>
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
                    <div className="flex-shrink-0">
                      <img
                        className="mx-2 h-24 w-32 rounded-lg border-2 border-solid border-[#FBB87F] object-cover"
                        alt="マイレシピ"
                        width={128}
                        height={96}
                        src={recipe.image}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="mr-1 line-clamp-1 break-all font-semibold">
                        {recipe.title}
                      </div>
                      <div className="mr-2 mt-2 line-clamp-2 flex-grow overflow-hidden break-all text-xs">
                        {recipe.content}
                      </div>
                      <div className="mr-2 mt-3 text-right text-sm lg:text-base">
                        <FontAwesomeIcon icon={faClock} />
                        {recipe.time}／
                        <FontAwesomeIcon icon={faYenSign} />
                        {recipe.price}／
                        <FontAwesomeIcon icon={faFire} />
                        {recipe.calorie}
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
  } else {
    return <div>ログインしてください</div>;
  }
};
export default Myrecipe;
