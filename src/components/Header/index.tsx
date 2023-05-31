import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import SideMenu from '../Sidemenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="sticky top-0 z-40 flex h-14 select-none items-center justify-center bg-[#FCCFA5] shadow-md">
      <div className="relative w-full">
        {/* ホーム画面以外には戻るボタンを表示する処理 */}
        {router.pathname !== '/home' ? (
          <div
            className="absolute left-4 cursor-pointer text-3xl transition duration-75 ease-in-out hover:scale-105 hover:text-orange-500"
            onClick={() => {
              window.history.back();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        ) : (
          ''
        )}
        <div
          className="absolute right-6 cursor-pointer text-3xl transition duration-75 ease-in-out hover:scale-105 hover:text-orange-500"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="flex items-center justify-center">
          <Link href="/home">
            <img
              src="/icon/logo.svg"
              alt="logo"
              className="mr-4 mt-0.5 h-9 w-56 lg:w-72"
            />
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default Header;
