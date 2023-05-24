import {
  faFileLines,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import useAuth from '@/hooks/auth/useAuth';

const Footer = () => {
  const router = useRouter();
  const { loginUser, isWaiting } = useAuth();

  // faHouseの色を変える関数
  const GetHouseColor = () => {
    if (router.pathname === '/home') {
      return 'text-orange-400';
    }
  };
  // faFilePenの色を変える関数
  const GetFilePenColor = () => {
    if (router.pathname === '/post') {
      return ' text-orange-400 ';
    }
  };
  // faFileLinesの色を変える関数
  const GetFileLinesColor = () => {
    if (router.pathname === '/myrecipe') {
      return ' text-orange-400 ';
    }
  };
  // faHeartの色を変える関数
  const GetHeartColor = () => {
    if (router.pathname === '/favoriterecipe') {
      return ' text-orange-400 ';
    }
  };
  // faMagnifyingGlassの色を変える関数
  const GetMagnifyingGlassColor = () => {
    if (router.pathname === '/searchrecipe') {
      return ' text-orange-400 ';
    }
  };
  // ログアウト中のアイコンの色を変える関数
  const IconColor = () => {
    if (!loginUser && !isWaiting) {
      return ' text-stone-400 hover:text-stone-400 ';
    } else {
      return ' text-[#75665C] hover:text-orange-500 ';
    }
  };

  return (
    <div className="sticky bottom-0 z-30 flex h-14 w-full select-none items-center justify-around -space-x-3 bg-[#FCCFA5] pt-0.5 text-center text-3xl">
      <Link href="/home">
        <div
          className={
            'w-20 transition duration-75 ease-in-out hover:scale-105 ' +
            GetHouseColor()
          }
        >
          <div>
            <FontAwesomeIcon icon={faHouse} className="m-auto h-8 w-8" />
            <div className="text-xs">
              {router.pathname === '/home' ? 'ホーム' : ''}
            </div>
          </div>
        </div>
      </Link>
      <Link href="/searchrecipe">
        <div
          className={
            'w-20 transition duration-75 ease-in-out hover:scale-105 ' +
            GetMagnifyingGlassColor()
          }
        >
          <div>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="m-auto h-8 w-8"
            />

            <div className="text-xs">
              {router.pathname === '/searchrecipe' ? '検索' : ''}
            </div>
          </div>
        </div>
      </Link>
      <Link href={loginUser ? '/favoriterecipe' : '/guidance'}>
        <div
          className={
            'w-20 transition duration-75 ease-in-out hover:scale-105 ' +
            GetHeartColor() +
            IconColor()
          }
        >
          <div>
            <FontAwesomeIcon icon={faHeart} className="m-auto h-8 w-8" />
            <div className="text-xs">
              {router.pathname === '/favoriterecipe' ? 'お気に入り' : ''}
            </div>
          </div>
        </div>
      </Link>
      <Link href={loginUser ? '/myrecipe' : '/guidance'}>
        <div
          className={
            'w-20 transition duration-75 ease-in-out hover:scale-105 ' +
            GetFileLinesColor() +
            IconColor()
          }
        >
          <div>
            <FontAwesomeIcon icon={faFileLines} className="m-auto h-8 w-8" />

            <div className="text-xs">
              {router.pathname === '/myrecipe' ? 'マイレシピ' : ''}
            </div>
          </div>
        </div>
      </Link>
      <Link href={loginUser ? '/post' : '/guidance'}>
        <div
          className={
            'w-20 transition duration-75 ease-in-out hover:scale-105 ' +
            GetFilePenColor() +
            IconColor()
          }
        >
          <div>
            <FontAwesomeIcon icon={faPen} className="m-auto h-8 w-8" />

            <div className="text-xs">
              {router.pathname === '/post' ? 'レシピ投稿' : ''}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
