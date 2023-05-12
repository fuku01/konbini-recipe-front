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

const Footer = () => {
  const router = useRouter();

  // faHouseの色を変える関数
  const GetHouseColor = () => {
    if (router.pathname === '/home') {
      return 'text-orange-400';
    }
  };
  // faFilePenの色を変える関数
  const GetFilePenColor = () => {
    if (router.pathname === '/post') {
      return 'text-orange-400';
    }
  };
  // faFileLinesの色を変える関数
  const GetFileLinesColor = () => {
    if (router.pathname === '/myrecipe') {
      return 'text-orange-400';
    }
  };

  return (
    <div className="sticky bottom-0 z-30 flex h-14 w-full items-center justify-around bg-[#FCCFA5] pt-0.5 text-center text-3xl">
      <div
        className={
          'w-20 transition duration-300 ease-in-out hover:scale-105 hover:text-orange-500 ' +
          GetHouseColor()
        }
      >
        <Link href="/home">
          <FontAwesomeIcon icon={faHouse} className="m-auto h-8 w-8" />
          <div className="text-xs">
            {router.pathname === '/home' ? 'ホーム' : ''}
          </div>
        </Link>
      </div>
      <div className="w-20 transition duration-300 ease-in-out hover:scale-105">
        <Link href="/home">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="m-auto h-8 w-8"
          />
        </Link>
      </div>
      <div className="w-20 transition duration-300 ease-in-out hover:scale-105">
        <Link href="/home">
          <FontAwesomeIcon icon={faHeart} className="m-auto h-8 w-8" />
        </Link>
      </div>
      <div
        className={
          'w-20 transition duration-300 ease-in-out hover:scale-105 hover:text-orange-500 ' +
          GetFileLinesColor()
        }
      >
        <Link href="/myrecipe">
          <FontAwesomeIcon icon={faFileLines} className="m-auto h-8 w-8" />
          <div className="text-xs">
            {router.pathname === '/myrecipe' ? 'マイレシピ' : ''}
          </div>
        </Link>
      </div>
      <div
        className={
          'w-20 transition duration-300 ease-in-out hover:scale-105 hover:text-orange-500 ' +
          GetFilePenColor()
        }
      >
        <Link href="/post">
          <FontAwesomeIcon icon={faPen} className="m-auto h-8 w-8" />
          <div className="text-xs">
            {router.pathname === '/post' ? 'レシピ投稿' : ''}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
