import {
  faCircleQuestion,
  faFileLines,
  faHeart,
  faHouse,
  faMagnifyingGlass,
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
import GuestLoginButton from './guestLoginButton';
import useAuth from '@/hooks/auth/useAuth';

// SideMenuPropsを定義

// isMenuOpenはboolean型、setIsMenuOpenはReact.Dispatch<React.SetStateAction<boolean>型である。
type SideMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Header.tsxで定義した「isMenuOpenとsetIsMenuOpen」を受け取る。
const SideMenu = (props: SideMenuProps) => {
  const { isMenuOpen, setIsMenuOpen } = props;

  const { loginUser } = useAuth();

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
    <div className="select-none">
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
          {loginUser ? (
            <div>
              <Link href="/home" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  ホーム
                </div>
              </Link>
              <Link href="/searchrecipe" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  検索
                </div>
              </Link>
              <Link href="/post" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  レシピ投稿
                </div>
              </Link>
              <Link href="/myrecipe" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  マイレシピ
                </div>
              </Link>
              <Link href="/favoriterecipe" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  お気に入り
                </div>
              </Link>
              <Link href="/information" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  使い方
                </div>
              </Link>
              <Link href="/edituser" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faUserGear}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  設定
                </div>
              </Link>
              <div className="ml-6 mt-8">
                <LogoutButton />
              </div>
            </div>
          ) : (
            // ログアウト中の場合
            <div>
              <Link href="/home" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  ホーム
                </div>
              </Link>
              <Link href="/searchrecipe" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  検索
                </div>
              </Link>
              <Link href="/information" className="hover:group">
                <div className="group ml-3 mr-6 mt-3 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
                  <FontAwesomeIcon
                    icon={faCircleQuestion}
                    className="mr-2 w-5 group-hover:scale-110"
                  />
                  使い方
                </div>
              </Link>
              <div className="ml-6 mt-8">
                <span className="ml-1 text-xs">初めての方はこちら</span>
                <SignupButton />
              </div>
              <div className="ml-6 mt-2">
                <span className="ml-1 text-xs">登録済みの方はこちら</span>
                <LoginButton />
              </div>
              <div className="ml-5 mt-10">
                <p className="mb-1 ml-2 text-xs">まずは試してみる！</p>
                <GuestLoginButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
