import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faFilePen,
  faFire,
  faYenSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { PostButton } from '@/components/Button';

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  time: number;
  calorie: number;
  image: string | undefined;
  created_at: Date;
  updated_at: Date;
  price: number;
};
type User = {
  id: number;
};

const Recipes = () => {
  // 以下のコードはレシピの詳細ページを表示するためのコード。
  // useRouterを使って、URLのパラメーターからIDを取得しています。
  // そのIDを使って、axiosを使って、レシピの詳細を取得しています。
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User>();

  // レシピの取得
  const getRecipe = useCallback(() => {
    axios
      .get<Recipe>('/recipes/' + id)
      .then((response) => {
        setRecipe(response.data);
        console.log('レシピの取得に成功しました', response.data);
      })
      .catch((error) => {
        console.log('レシピの取得に失敗しました', error);
      });
  }, [id]);

  // ログイン中のユーザーの取得;
  const getCurrentUser = async () => {
    try {
      const response = await axios.get<User>('/me');
      setCurrentUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('ユーザーの取得に失敗しました', error);
    }
  };

  useEffect(() => {
    getRecipe();
    getCurrentUser();
  }, [getRecipe]);

  // 分アイコンの色を変える関数
  const GetTimeColor = () => {
    if (!recipe?.time) {
      return 'text-gray-400';
    } else if (recipe.time < 5) {
      return 'text-[#68B68D]';
    } else if (recipe.time < 20) {
      return 'text-[#FBD87F]';
    } else {
      return 'text-[#F16B6E]';
    }
  };
  // 金額アイコンの色を変える関数
  const GetPriceColor = () => {
    if (!recipe?.price) {
      return 'text-gray-400';
    } else if (recipe.price < 500) {
      return 'text-[#68B68D]';
    } else if (recipe.price < 2000) {
      return 'text-[#FBD87F]';
    } else {
      return 'text-[#F16B6E]';
    }
  };
  // カロリーアイコンの色を変える関数
  const GetCalorieColor = () => {
    if (!recipe?.calorie) {
      return 'text-gray-400';
    } else if (recipe.calorie < 500) {
      return 'text-[#68B68D]';
    } else if (recipe.calorie < 1000) {
      return 'text-[#FBD87F]';
    } else {
      return 'text-[#F16B6E]';
    }
  };

  return (
    <div>
      {recipe?.image && (
        <img
          src={recipe.image}
          alt="レシピ画像"
          width={300}
          height={200}
          className="mx-auto mb-3 h-52 w-72 rounded-3xl border-4 border-solid border-[#FBB87F] object-cover shadow-md"
        />
      )}
      <div className="mx-2 mb-8 rounded-md text-center text-2xl font-bold text-orange-500">
        {recipe?.title}
      </div>
      <div className="flex justify-around">
        <div className="inline-flex min-w-[5rem] flex-col items-center rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faClock}
            className={'mb-2 text-5xl ' + GetTimeColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.time ? recipe.time : '-'}
            <span className="ml-1 text-xs">分</span>
          </div>
        </div>
        <div className="inline-flex min-w-[5rem] flex-col rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faYenSign}
            className={'mb-2 text-5xl ' + GetPriceColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.price ? recipe.price.toLocaleString() : '-'}
            <span className="ml-1 text-xs">円</span>
          </div>
        </div>
        <div className="inline-flex min-w-[5rem] flex-col rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faFire}
            className={'mb-2 text-5xl ' + GetCalorieColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.calorie ? recipe.calorie.toLocaleString() : '-'}
            <span className="ml-1 text-xs">kcal</span>
          </div>
        </div>
      </div>
      <div className="my-5 text-orange-500">カテゴリ</div>
      <div className="my-1 text-orange-500">作り方</div>
      <div className="rounded-sm bg-[#FDF1DE] px-2 py-2 shadow-md ">
        {/* 改行や空白を正しく表示させる処理 */}
        {recipe?.content.split('\n').map((line, index) => {
          return (
            <p key={index}>
              {line}
              <br />
            </p>
          );
        })}
      </div>
      <div className="my-5 text-orange-500">バーコードタグ</div>

      {recipe?.user_id === currentUser?.id && (
        <div className="mt-14 text-right">
          <Link href={'/editrecipes/' + id}>
            <PostButton>
              <FontAwesomeIcon icon={faFilePen}></FontAwesomeIcon>
            </PostButton>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Recipes;
