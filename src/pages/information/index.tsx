import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBarcode,
  faFileLines,
  faHeart as solidHeart,
  faMagnifyingGlass,
  faPen,
  faTag,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Information = () => {
  return (
    <div className="mx-2 select-none text-sm">
      <div className="border-b-2 border-dotted border-[#FCCFA5] pb-8">
        <p className="mb-2 text-base font-bold">
          <FontAwesomeIcon icon={faCircleQuestion} className="w-5" />
          「コンビニレシピ」とは
        </p>
        <div className="ml-5 space-y-2 text-sm">
          <p>
            特に普段料理をせず
            <span className="font-semibold text-orange-500">
              コンビニご飯が多い方
            </span>
            を対象にした、簡単なコンビニ食材のアレンジ方法を共有するサービスです。
          </p>
          <p>
            <span className="font-semibold text-orange-500">
              バーコードスキャン機能
            </span>
            を使えば、商品のバーコードを読み取るだけで、関連レシピを手間なく簡単に探すことができます。
          </p>
          <p>
            料理が苦手でも、手軽に入手できるコンビニ食材を工夫することで、日々の食事をより美味しく楽しくしていきましょう！
          </p>
          <p className="pt-2 text-xs text-red-500">
            ※ レシピの投稿やお気に入り登録にはログインが必要となります。
          </p>
        </div>
      </div>
      <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
        <span className="rounded-lg bg-[#FDF1DE] px-1 font-semibold">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-1 w-5" />
          レシピの探し方
        </span>
        <div className="ml-5 mt-2 space-y-2 text-xs">
          <p>
            <span className="font-semibold">❶ ホームから探す</span>
            ：ホーム画面では、人気ランキングと新着レシピをチェックすることができます。
          </p>
          <p>
            <span className="font-semibold">❷ キーワードから探す</span>
            <span className="text-orange-500">
              「
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
              検索バー」
            </span>
            に料理名や食材を入力し、レシピを検索できます。
          </p>
          <p>
            <span className="font-semibold">❸ タグから探す</span>
            ：レシピページの特定の{' '}
            <span className="text-orange-500">
              「
              <FontAwesomeIcon icon={faTag} className="w-4" />
              タグ」
            </span>
            をクリックし、同じタグが付いたレシピを検索できます。
          </p>
          <p>
            <span className="font-semibold">❹ バーコードから探す</span>
            ：検索バーの横にある
            <span className="text-orange-500">
              「
              <FontAwesomeIcon icon={faBarcode} className="w-4 " />
              バーコード」
            </span>
            ボタンをクリックし、カメラで食材のバーコードをスキャン。その商品を使用したレシピを検索できます。
          </p>
        </div>
      </div>
      <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
        <span className="rounded-lg bg-[#FDF1DE] px-1 font-semibold">
          <FontAwesomeIcon icon={faPen} className="mr-1 w-5 " />
          自分のレシピを投稿する
        </span>
        <p className="ml-5 mt-2 text-xs">
          <span className="text-orange-500">
            「<FontAwesomeIcon icon={faPen} className="w-4 " />
            レシピ投稿」
          </span>
          ボタンをクリックし、写真・タイトル・作り方・タグ（任意の文字列や、カメラで食材の
          <span className="text-orange-500">
            「<FontAwesomeIcon icon={faBarcode} className="w-4 " />
            バーコード」
          </span>
          をスキャンして登録）・調理時間・金額・カロリーを入力します。
        </p>
      </div>
      <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
        <span className="rounded-lg bg-[#FDF1DE] px-1 font-semibold">
          <FontAwesomeIcon icon={faFileLines} className="mr-1 w-5 " />
          マイレシピの確認
        </span>
        <p className="ml-5 mt-2 text-xs">
          <span className="text-orange-500">
            「<FontAwesomeIcon icon={faFileLines} className="w-4" />
            マイレシピ」
          </span>
          ボタンから自分が投稿したレシピの一覧を確認できます。各レシピはいつでも編集や削除が可能です。
        </p>
      </div>
      <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
        <span className="rounded-lg bg-[#FDF1DE] px-1 font-semibold">
          <FontAwesomeIcon icon={solidHeart} className="mr-1 w-5 " />
          レシピのお気に入り登録
        </span>
        <p className="ml-5 mt-2 text-xs">
          お気に入りのレシピを見つけたら、{' '}
          <span className="text-orange-500">
            「
            <FontAwesomeIcon icon={regularHeart} className="w-4 " />
            お気に入り」
          </span>
          ボタンをクリックして保存できます。お気に入り登録したレシピは素早く参照することが可能です。
        </p>
      </div>
    </div>
  );
};

export default Information;
