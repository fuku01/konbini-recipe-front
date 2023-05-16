import {
  faClock,
  faFire,
  faHeart,
  faYenSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
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
  favorites_count: number;
};

type RcipeListProps = {
  recipes: Recipe[];
};

const RcipeList = (props: RcipeListProps) => {
  const { currentUser } = useAuth();

  // 数字を見やすくする関数(Kとかつける。　※最大9.9Kまで表示)
  const formatNumber = (num: number) => {
    if (num >= 9950) {
      return '9.9k';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return num;
    }
  };

  // 分アイコンの色を変える関数
  const GetTimeColor = (recipe: Recipe) => {
    if (!recipe?.time) {
      return 'text-gray-400';
    } else if (recipe.time < 10) {
      return 'text-[#68B68D]';
    } else if (recipe.time < 30) {
      return 'text-[#FBD87F]';
    } else {
      return 'text-[#F16B6E]';
    }
  };

  // 金額アイコンの色を変える関数
  const GetPriceColor = (recipe: Recipe) => {
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
  const GetCalorieColor = (recipe: Recipe) => {
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

  if (currentUser) {
    return (
      <div>
        <div>
          {props.recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="my-3 h-28 rounded-lg bg-[#FFFAF2] py-2 shadow-md hover:bg-[#FDF1DE] hover:text-orange-500 hover:shadow-lg"
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
                        className="mx-1.5 h-24 w-32 rounded-lg border-2 border-solid border-[#FBB87F] object-cover lg:mx-2"
                        alt="レシピリスト"
                        src={recipe.image}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="mr-1 line-clamp-1 break-all font-bold">
                        {recipe.title}
                      </div>
                      <div className="ml-0.5 mr-1 mt-2.5 line-clamp-2 flex-grow overflow-hidden whitespace-pre-wrap break-all text-xs">
                        {recipe.content}
                      </div>
                      <div className="mr-1 mt-3 text-right text-xs font-semibold lg:mr-2 lg:text-base">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="mr-0.5 text-[#ef6a6d]"
                        />
                        <span className="mr-1.5 lg:mr-4 lg:text-sm">
                          {recipe?.favorites_count ? formatNumber(9999) : 0}
                        </span>
                        <FontAwesomeIcon
                          icon={faClock}
                          className={'mr-0.5 ' + GetTimeColor(recipe)}
                        />
                        <span className="mr-1.5 lg:mr-4 lg:text-sm">
                          {recipe?.time ? recipe.time : '-'}
                        </span>
                        <FontAwesomeIcon
                          icon={faYenSign}
                          className={'mr-0.5 ' + GetPriceColor(recipe)}
                        />
                        <span className="mr-1.5 lg:mr-4 lg:text-sm">
                          {recipe?.price
                            ? recipe?.price?.toLocaleString()
                            : '-'}
                        </span>
                        <FontAwesomeIcon
                          icon={faFire}
                          className={'mr-0.5 ' + GetCalorieColor(recipe)}
                        />
                        <span className="lg:text-sm">
                          {recipe?.calorie
                            ? recipe.calorie.toLocaleString()
                            : '-'}
                        </span>
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
export default RcipeList;
