import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
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
  tags: Tag[]; // タグ情報を含むプロパティ
};
type User = {
  id: number;
};
type Tag = {
  id: number;
  name: string;
};
type Favorite = {
  id: number;
  user_id: number | undefined;
  recipe_id: number | undefined;
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

  // ログイン中のユーザー情報の取得（ログインユーザのみ編集ボタンを表示させたいため、取得する必要がある）
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

  // お気に入りを追加する関数
  const addFavorite = async () => {
    const data: Favorite = {
      id: 0,
      user_id: currentUser?.id,
      recipe_id: recipe?.id,
    };
    try {
      const response = await axios.post('/favorites', data);
      console.log('お気に入りを追加しました', response.data);
    } catch (error) {
      console.log('お気に入りの追加に失敗しました', error);
    }
  };

  // 現在開いているレシピIDにお気に入りを追加済みかどうかを判定する関数

  return (
    <div>
      {recipe?.image && (
        <div className="relative mx-auto mb-3 h-52 w-72 ">
          <img
            src={recipe.image}
            alt="レシピ画像"
            className="relative h-full w-full rounded-3xl border-4 border-solid border-[#FBB87F] bg-white object-cover shadow-md"
          />
          <div className="absolute bottom-2 right-2 rounded-full bg-[#FDF1DE] bg-opacity-80 px-2 py-2 ">
            <FontAwesomeIcon
              icon={faHeart}
              className={
                'text-4xl ' +
                (currentUser ? 'cursor-pointer ' : 'pointer-events-none')
              }
              onClick={addFavorite}
            />
          </div>
        </div>
      )}
      {recipe?.title ? (
        <div className="mx-2 mb-8 ml-4 inline-block whitespace-pre-wrap break-all rounded-md text-2xl font-bold text-orange-500 lg:ml-7">
          {recipe.title}
        </div>
      ) : (
        <div className="mx-2 h-16" />
      )}

      <div className="flex justify-around">
        <div className="inline-flex min-w-[5rem] flex-col items-center rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faClock}
            className={'mb-2 text-5xl ' + GetTimeColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.time ? recipe.time : '-'}
            <span className="ml-1 mt-1 text-xs">分</span>
          </div>
        </div>
        <div className="inline-flex min-w-[5rem] flex-col rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faYenSign}
            className={'mb-2 text-5xl ' + GetPriceColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.price ? recipe.price.toLocaleString() : '-'}
            <span className="ml-1 mt-1 text-xs">円</span>
          </div>
        </div>
        <div className="inline-flex min-w-[5rem] flex-col rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faFire}
            className={'mb-2 text-5xl ' + GetCalorieColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.calorie ? recipe.calorie.toLocaleString() : '-'}
            <span className="ml-1 mt-1 text-xs">kcal</span>
          </div>
        </div>
      </div>
      <div className="mt-6 text-orange-500">作り方</div>
      <div className="rounded-sm bg-[#FDF1DE] px-2 py-2 shadow-md">
        {/* 改行や空白を正しく表示させる処理 */}
        <div className="whitespace-pre-wrap break-all">{recipe?.content}</div>
      </div>
      <div className="mt-6 text-orange-500">タグ</div>
      {/* レシピに紐づくタグを表示 */}
      <div className="flex flex-wrap">
        {recipe?.tags.map((tag) => (
          <div key={tag.id} className="flex">
            <div className="mr-3 mt-2 rounded-md bg-[#FDF1DE] px-1 py-0.5 shadow-md">
              # {tag.name}
            </div>
          </div>
        ))}
      </div>
      {/* 現在ログインしているユーザーがレシピを作成したユーザーである場合に、編集ボタンが表示される。 */}
      {currentUser && recipe && recipe.user_id === currentUser.id && (
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
