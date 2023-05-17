import {
  faCircleQuestion,
  faFileLines,
  faHouse,
  faPen,
  faUserGear,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// プラグインでスクロールを制御（サイドメニュー表示中の）
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignupButton from './SignupButton';
import useAuth from '@/hooks/auth/useAuth';

// SideMenuPropsを定義

// isMenuOpenはboolean型、setIsMenuOpenはReact.Dispatch<React.SetStateAction<boolean>>型である。
type SideMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Header.tsxで定義した「isMenuOpenとsetIsMenuOpen」を受け取る。
const SideMenu = (props: SideMenuProps) => {
  const { isMenuOpen, setIsMenuOpen } = props;

  const { auth } = useAuth();

  // サイドメニュー表示中に、背景をスクロールできなくする。//
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
        className="absolute right-0 top-0 z-50 h-screen w-1/2 flex-1 overflow-y-auto bg-[#FCCFA5] "
        ref={sideMenu}
      >
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faXmark}
            className="mr-6 mt-3 cursor-pointer text-4xl transition duration-75 ease-in-out hover:scale-105 hover:text-orange-500"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          />
        </div>
        {/* 以下にメニュー項目を追加する */}
        <div
          className="text-lg"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {/* ログイン中の場合 */}
          {auth.currentUser ? (
            <div>
              <div className="ml-7 mt-6 hover:text-orange-500 hover:underline">
                <Link href="/home">
                  <FontAwesomeIcon icon={faHouse} className="mr-2 w-5" />
                  ホーム
                </Link>
              </div>
              <Link href="/post">
                <div className="ml-7 mt-6 hover:text-orange-500 hover:underline">
                  <FontAwesomeIcon icon={faPen} className="mr-2 w-5" />
                  レシピ投稿
                </div>
              </Link>
              <Link href="/myrecipe">
                <div className="ml-7 mt-6 hover:text-orange-500 hover:underline">
                  <FontAwesomeIcon icon={faFileLines} className="mr-2 w-5" />
                  マイレシピ
                </div>
              </Link>
              <div className="ml-7 mt-6 hover:text-orange-500 hover:underline">
                <FontAwesomeIcon icon={faCircleQuestion} className="mr-2 w-5" />
                使い方
              </div>
              <Link href="/edituser">
                <div className="ml-7 mt-10 hover:text-orange-500 hover:underline">
                  <FontAwesomeIcon icon={faUserGear} className="mr-2 w-5" />
                  設定
                </div>
              </Link>
              <div className="ml-7 mt-6">
                <LogoutButton />
              </div>
            </div>
          ) : (
            // ログアウト中の場合
            <div>
              <div className="ml-7 mt-6">
                <SignupButton />
              </div>
              <div className="ml-7 mt-6">
                <LoginButton />
              </div>
              <div className="ml-7 mt-8 hover:text-orange-500 hover:underline ">
                <FontAwesomeIcon icon={faCircleQuestion} className="mr-2 w-5" />
                使い方
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SideMenu;
