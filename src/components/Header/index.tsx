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
    <div className="sticky top-0 z-40 flex h-14 items-center justify-center bg-[#FCCFA5] text-white shadow-md">
      <div className="relative w-full">
        {router.pathname !== '/home' ? (
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="absolute left-4 cursor-pointer text-3xl text-black hover:text-orange-500"
            onClick={() => {
              window.history.back();
            }}
          />
        ) : (
          ''
        )}
        <FontAwesomeIcon
          icon={faBars}
          className="absolute right-6 cursor-pointer text-3xl text-black hover:text-orange-500"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        />
        <div className="text-center text-2xl font-bold text-black">
          <Link href="/home">コンビニレシピ</Link>
        </div>
      </div>
      {isMenuOpen && (
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default Header;
