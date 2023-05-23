import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import React from 'react';
import useAuth from '@/hooks/auth/useAuth';

const LogoutButton = () => {
  const { auth } = useAuth();

  const LogoutCheck = () => {
    if (window.confirm('ログアウトしますか？')) {
      // useAuth内でログアウト処理（FIREBASEからのログアウトと、CurrentUserをNUllに更新z）
      signOut(auth);
      alert('ログアウトしました');
      window.location.href = '/home';
    }
  };

  return (
    <div>
      <button
        className="rounded-full bg-[#FEABAE] px-4 py-2 text-center text-sm text-white shadow-md hover:bg-[#F16B6E] active:scale-105 lg:text-base"
        onClick={() => {
          LogoutCheck();
        }}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 w-5" />
        ログアウト
      </button>
    </div>
  );
};

export default LogoutButton;
