import {
  faHeart as regularHeart,
  faClock,
} from '@fortawesome/free-regular-svg-icons';

import {
  faHeart as solidHeart,
  faFilePen,
  faFire,
  faYenSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PostButton } from '@/components/Button';
import { searchWordState } from '@/state/search';

type Recipe = {
  id: number;
  user_id: number;
  user_name: string;
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
  // 以下のコードはレシピの詳細ページを表示するためのコード。useRouterを使って、URLのパラメーターからIDを取得し、そのIDを使って、axiosを使って、レシピの詳細を取得する。
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const setSearchWords = useSetRecoilState(searchWordState); //検索ワードを他ページ遷移後も保持する「Recoil」のstateの[SETだけ使う]関数

  const [isFavorite, setIsFavorite] = useState<boolean>(false); // お気に入りの登録状態を管理するステート
  const [isFavoriteId, setIsFavoriteId] = useState<number | undefined>(
    undefined
  ); // お気に入りのIDを管理するステート
  const [favoriteCount, setFavoriteCount] = useState<number>(0); // お気に入りの数を管理するステート
  const [canClick, setCanClick] = useState<boolean>(true); // お気に入りボタンをクリックできるかどうかを管理するステート

  const [currentUser, setCurrentUser] = useState<User>(); // ログイン中のユーザー情報を管理するステート

  // レシピの取得
  const getRecipe = useCallback(async () => {
    try {
      const response = await axios.get<Recipe>('/recipes/' + id);
      setRecipe(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('レシピの取得に失敗しました', error);
    }
  }, [id]);

  // ログイン中のユーザー情報の取得（ログインユーザのみ編集ボタンを表示させたいため、取得する必要がある）
  const getCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get<User>('/me');
      setCurrentUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('ユーザーの取得に失敗しました', error);
    }
  }, []);

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
      await getFavoriteCount();
      await checkFavorite();
      console.log('お気に入りを追加しました', response.data);
    } catch (error) {
      console.log('お気に入りの追加に失敗しました', error);
    }
  };

  // お気に入りを削除する関数
  const deleteFavorite = async () => {
    try {
      const response = await axios.delete('/favorites/' + isFavoriteId);
      await getFavoriteCount();
      await checkFavorite();
      console.log('お気に入りを削除しました', response.data);
    } catch (error) {
      console.log('お気に入りの削除に失敗しました', error);
    }
  };

  // 現在のユーザーによってお気に入りに登録されているかどうかを確認する関数
  const checkFavorite = useCallback(async () => {
    // ログイン中かつ、レシピが定義されている場合のみ処理を実行する
    if (recipe && recipe.id && currentUser) {
      const response = await axios.get('/isRecipe_favorite/' + recipe.id);
      setIsFavorite(response.data.favorited);
      // お気に入り済みの場合は、お気に入りIDを取得する
      if (response.data.favorited) {
        setIsFavoriteId(response.data.favorite_id);
        console.log('お気に入りID:', response.data.favorite_id);
      }
      console.log('お気に入り状態:', isFavorite);
    }
  }, [currentUser, isFavorite, recipe]);

  // お気に入りの数を取得する関数
  const getFavoriteCount = useCallback(async () => {
    if (recipe && recipe.id) {
      const response = await axios.get('/favorite_count/' + recipe.id);
      setFavoriteCount(response.data.favorite_count);
      console.log('お気に入り数:', response.data.favorite_count);
    }
  }, [recipe]);

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

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  useEffect(() => {
    checkFavorite();
  }, [checkFavorite]);

  useEffect(() => {
    getFavoriteCount();
  }, [getFavoriteCount]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  return (
    <div className="select-none">
      {recipe?.image && (
        <div className="relative mx-auto h-52 w-72 ">
          <img
            src={recipe.image}
            alt="レシピ画像"
            className="relative h-full w-full rounded-2xl border-4 border-[#FBB87F] bg-white object-cover shadow-md"
          />
          {/* お気に入りボタンの処理 */}
          <div className="absolute bottom-1 right-1 rounded-br-xl rounded-tl-xl bg-[#FDF1DE] bg-opacity-80 px-2 py-1">
            <FontAwesomeIcon
              icon={isFavorite ? solidHeart : regularHeart}
              className={
                'text-4xl text-[#FEABAE] ' +
                (currentUser
                  ? 'cursor-pointer transition duration-75 ease-in-out hover:text-[#ef6a6d]'
                  : 'pointer-events-none') +
                (isFavorite
                  ? ' scale-105 text-[#ef6a6d] hover:text-[#feabae]'
                  : '') +
                (!canClick ? ' pointer-events-none' : '')
              }
              onClick={() => {
                if (canClick) {
                  // クリックが可能な場合、通常の処理を実行
                  setCanClick(false); // クリックを無効化
                  setTimeout(() => setCanClick(true), 200); // 0.2秒後にクリックを再び有効化
                  if (currentUser) {
                    if (isFavorite) {
                      // お気に入り登録されている場合
                      deleteFavorite(); // 削除
                      console.log('お気に入り登録済みです');
                    } else {
                      // お気に入り登録されていない場合
                      addFavorite(); // 追加
                    }
                  } else {
                    console.log(
                      'お気に入り機能を利用するにはログインが必要です!'
                    );
                  }
                }
              }}
            />
            {/* お気に入りの数を表示 */}
            <div className="text-center text-sm font-bold">
              {formatNumber(favoriteCount)}
            </div>
          </div>
        </div>
      )}
      {recipe?.title ? (
        <div className="mx-4 mb-5 mt-2 inline-block whitespace-pre-wrap break-all rounded-md text-2xl font-bold text-orange-500 lg:mx-7">
          {recipe.title}
        </div>
      ) : (
        <div className="mx-2 h-16" />
      )}

      <div className="flex justify-around space-x-2 font-semibold">
        <div className="inline-flex w-24 flex-col items-center rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faClock}
            className={'mb-2 text-5xl ' + GetTimeColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.time ? recipe.time : '-'}
            <span className="ml-1 mt-1 text-xs">分</span>
          </div>
        </div>
        <div className="inline-flex w-24 flex-col rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
          <FontAwesomeIcon
            icon={faYenSign}
            className={'mb-2 text-5xl ' + GetPriceColor()}
          />
          <div className="inline-flex items-center justify-center">
            {recipe?.price ? recipe.price.toLocaleString() : '-'}
            <span className="ml-1 mt-1 text-xs">円</span>
          </div>
        </div>
        <div className="inline-flex w-24 flex-col rounded-2xl bg-[#FDF1DE] py-3 shadow-md">
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
      <div className="mb-2 mt-10 text-lg font-semibold text-orange-500">
        作り方
      </div>
      <div className="rounded-md bg-[#FDF1DE] px-2 py-2 shadow-md">
        {/* 改行や空白を正しく表示させる処理 */}
        <div className="whitespace-pre-wrap break-all">{recipe?.content}</div>
      </div>
      <div className="mb-2 mt-10 text-lg font-semibold text-orange-500">
        タグ
      </div>
      {/* レシピに紐づくタグを表示 */}
      <div className="flex flex-wrap">
        {recipe?.tags.map((tag) => (
          <div key={tag.id} className="flex">
            <div
              className="mb-2 mr-3 cursor-pointer rounded-md bg-[#FDF1DE] px-1 py-0.5 shadow-md transition duration-75 ease-in-out hover:bg-[#FCCFA5] active:scale-105"
              // クリックしたら検索画面に遷移すると同時に、searchrecipeパージのsetSearchWordsにタグ名の頭の空白を削除したnameを渡す
              onClick={() => {
                setSearchWords([tag.name]); // 検索ワードをタグ名に設定
                router.push('/searchrecipe');
              }}
            >
              # {tag.name}
            </div>
          </div>
        ))}
      </div>
      {/* 作成日と更新日を表示 */}
      <div className="mt-10 text-center text-xs text-gray-500">
        作成日：
        {recipe ? new Date(recipe?.created_at).toLocaleDateString() : 'N/A'}
        {recipe && recipe.updated_at !== recipe.created_at && (
          <span>
            {'　'}( 更新日：
            {new Date(recipe.updated_at).toLocaleDateString()} )
          </span>
        )}
      </div>
      {/* 作成ユーザーを表示 */}
      {/* <div className="mt-2 text-center text-xs text-gray-500">
        作成者：{recipe?.user_name}
      </div> */}
      {/* 現在ログインしているユーザーがレシピを作成したユーザーである場合に、編集ボタンが表示される。 */}
      {currentUser && recipe && recipe.user_id === currentUser.id && (
        <div className="mt-8 text-right">
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
