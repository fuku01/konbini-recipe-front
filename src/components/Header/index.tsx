import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import SideMenu from '../Sidemenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex h-20 items-center justify-center bg-[#FCCFA5] text-white shadow-sm">
      <div className="relative w-full">
        <FontAwesomeIcon
          icon={faBars}
          className="absolute left-6 cursor-pointer text-4xl text-black hover:text-orange-500"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        />
        <div className="text-center text-2xl font-bold text-black">
          コンビニレシピ
        </div>
      </div>
      {isMenuOpen && (
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      )}
    </div>
  );
};

export default Header;
