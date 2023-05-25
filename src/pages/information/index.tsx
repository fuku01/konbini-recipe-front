import { faFileLines, faHeart, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from 'next/link';
import React from 'react';

const Information = () => {
  return (
    <div className="select-none text-sm">
      {/* ------------------------------機能の案内---------------------------------- */}
      <div>
        <div className="mx-6 mt-3">
          <div className="border-y-2 border-dotted border-[#FCCFA5] py-2.5">
            <p className="font-semibold">
              <FontAwesomeIcon icon={faPen} className="mr-2 w-5" />
              レシピ投稿
            </p>
            <p className="ml-5 text-xs">
              自分のレシピを投稿して、他の人に共有できます。
            </p>
          </div>
          <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
            <p className="font-semibold">
              <FontAwesomeIcon icon={faFileLines} className="mr-2 w-5" />
              マイレシピ
            </p>
            <p className="ml-5 text-xs">
              自分が投稿したレシピを一覧で確認し、編集・削除できます。
            </p>
          </div>
          <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
            <div className="font-semibold">
              <FontAwesomeIcon icon={faHeart} className="mr-2 w-5" />
              お気に入り
              <p className="ml-5 text-xs">
                他の人のレシピをお気に入り登録し、一覧で確認できます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
