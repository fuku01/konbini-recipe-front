import {
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
    } else {
      return 'text';
    }
  };

  // faFilePenの色を変える関数
  const GetFilePenColor = () => {
    if (router.pathname === '/post') {
      return 'text-orange-400';
    } else {
      return 'text-black';
    }
  };

  return (
    <div className="sticky bottom-0 z-30 flex h-14 items-center justify-around bg-[#FCCFA5] pt-2">
      <Link href="/home" className="w-10">
        <FontAwesomeIcon
          icon={faHouse}
          className={'text-3xl hover:text-orange-500 ' + GetHouseColor()}
        />
        <div className="text-xs">
          {router.pathname === '/home' ? 'ホーム' : ''}
        </div>
      </Link>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="w-10 text-3xl text-black"
      />
      <FontAwesomeIcon icon={faHeart} className="w-10 text-3xl text-black" />
      <Link href="/post" className="w-10">
        <FontAwesomeIcon
          icon={faPen}
          className={'text-3xl hover:text-orange-500 ' + GetFilePenColor()}
        />
        <div className="text-xs">
          {router.pathname === '/post' ? '投稿' : ''}
        </div>
      </Link>
    </div>
  );
};

export default Footer;
