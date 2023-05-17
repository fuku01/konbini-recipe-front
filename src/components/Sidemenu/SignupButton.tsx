import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import router from 'next/router';
import React from 'react';

const SignupButton = () => {
  return (
    <div>
      <button
        className="rounded-full bg-[#94C8AD] px-3 py-2 text-center text-base text-white shadow-md hover:bg-[#68B68D]"
        onClick={() => {
          router.push('/signup');
        }}
      >
        <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
        新規登録
      </button>
    </div>
  );
};

export default SignupButton;
