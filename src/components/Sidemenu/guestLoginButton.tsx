import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithEmailAndPassword } from 'firebase/auth';
import router from 'next/router';
import React from 'react';
import useAuth from '@/hooks/auth/useAuth';

const GuestLoginButton = () => {
  const { auth } = useAuth();

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, '111@gmail.com', '111111');
      alert('ゲストログインしました');
      await router.push('/home');
    } catch (error) {
      alert('ゲストログインに失敗しました');
      await router.push('/login');
    }
  };

  return (
    <div>
      <button
        className="rounded-full bg-[#FFE9AF] px-4 py-3 text-center text-sm font-black shadow-md outline-dotted hover:bg-[#FBD87F] active:scale-105 lg:text-lg "
        onClick={() => {
          loginUser();
        }}
      >
        <FontAwesomeIcon icon={faUserGroup} className="mr-1" />
        ゲストログイン
      </button>
    </div>
  );
};

export default GuestLoginButton;
