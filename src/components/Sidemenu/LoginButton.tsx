import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';
import React from 'react';

const LoginButton = () => {
  return (
    <div>
      <button
        className="hover:syadow-lg rounded-full bg-[#9FCDE5] px-3 py-2 text-center text-base text-white shadow-md hover:bg-[#61B3DF]"
        onClick={() => {
          router.push('/login');
        }}
      >
        <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
        ログイン
      </button>
    </div>
  );
};

export default LoginButton;
