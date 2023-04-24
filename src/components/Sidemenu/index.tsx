import {
  faCircleQuestion,
  faFile,
  faFileLines,
  faFilePen,
  faPen,
  faUserPen,
  faUserPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
// SideMenuPropsを定義
// isMenuOpenはboolean型、setIsMenuOpenはReact.Dispatch<React.SetStateAction<boolean>>型である。
type SideMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Header.tsxで定義した「isMenuOpenとsetIsMenuOpen」を受け取る。
export const SideMenu = (props: SideMenuProps) => {
  const { isMenuOpen, setIsMenuOpen } = props;

  // サイドメニューが出てる時に、背景をスクロールできなくする。//
  const sideMenu = useRef(null);
  useEffect(() => {
    if (isMenuOpen && sideMenu.current) {
      disableBodyScroll(sideMenu.current);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isMenuOpen]);
  ///////////////////////////////////////////////////

  // サイドメニューを表示中は背景にオーバーレイを表示する
  const overlay = (() => {
    if (isMenuOpen === true) {
      return (
        <div
          className="fixed inset-0 z-40 mx-auto flex items-center justify-center bg-black opacity-50 lg:w-1/3"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        ></div>
      );
    } else {
      return null;
    }
  })();

  return (
    <>
      {overlay}
      <div
        className="bod absolute left-0 top-0 z-50 h-screen w-1/2 flex-1 bg-[#FCCFA5] text-black"
        ref={sideMenu}
      >
        <FontAwesomeIcon
          icon={faXmark}
          className="ml-6 mt-6 cursor-pointer text-4xl hover:text-orange-500"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        />
        {/* 以下にメニュー項目を追加する */}
        <div
          className="text-lg"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <Link href="/signup">
            <div className="mx-6 mt-8 hover:text-orange-500 hover:underline">
              <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
              新規登録
            </div>
          </Link>
          <div className="mx-6 mt-8 hover:text-orange-500 hover:underline">
            <FontAwesomeIcon icon={faUserPen} className="mr-3" />
            プロフィール編集
          </div>
          <Link href="/post">
            <div className="mx-6 mt-8 hover:text-orange-500 hover:underline">
              <FontAwesomeIcon icon={faPen} className="mr-3" />
              レシピ投稿
            </div>
          </Link>
          <Link href="/myrecipe">
            <div className="mx-6 mt-8 hover:text-orange-500 hover:underline">
              <FontAwesomeIcon icon={faFileLines} className="mr-4" />
              マイレシピ
            </div>
          </Link>
          <div className="ml-6 mt-8 hover:text-orange-500 hover:underline ">
            <FontAwesomeIcon icon={faCircleQuestion} className="pr-4" />
            使い方
          </div>
        </div>
      </div>
    </>
  );
};
