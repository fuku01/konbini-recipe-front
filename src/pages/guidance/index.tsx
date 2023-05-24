import { faFileLines, faHeart, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Link from 'next/link';
import React from 'react';
import LoginButton from '@/components/Sidemenu/LoginButton';
import SignupButton from '@/components/Sidemenu/SignupButton';
import GuestLoginButton from '@/components/Sidemenu/guestLoginButton';
import useAuth from '@/hooks/auth/useAuth';

const Guidance = () => {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="select-none text-sm">
        {/* ------------------------------機能の案内---------------------------------- */}
        <div>
          <p className="text-center text-base font-bold">
            ログインすると次の機能が使えます。
          </p>
          <div className="mx-6 mt-3">
            <div className="border-y-2 border-dotted border-[#FCCFA5] py-2.5">
              <p className="font-semibold">
                <FontAwesomeIcon icon={faPen} className="mr-2 w-5" />
                レシピ投稿
              </p>
              <p className="ml-5 text-xs">
                自分のレシピを投稿して、他の人に共有できます。
              </p>
            </div>
            <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
              <p className="font-semibold">
                <FontAwesomeIcon icon={faFileLines} className="mr-2 w-5" />
                マイレシピ
              </p>
              <p className="ml-5 text-xs">
                自分が投稿したレシピを一覧で確認し、編集・削除できます。
              </p>
            </div>
            <div className="border-b-2 border-dotted border-[#FCCFA5] py-2.5">
              <p className="font-semibold">
                <FontAwesomeIcon icon={faHeart} className="mr-2 w-5" />
                お気に入り
                <p className="ml-5 text-xs">
                  他の人のレシピをお気に入り登録し、一覧で確認できます。
                </p>
              </p>
            </div>
          </div>
        </div>
        {/* -----------------------------ログインの案内--------------------------------- */}
        <div className="mx-6 mb-8 mt-6 rounded-2xl bg-[#FDF1DE] pb-10 pt-5 text-center shadow-md">
          <div className="mx-2 flex justify-around">
            <div>
              <span className="text-xs">初めての方はこちら</span>
              <SignupButton />
            </div>
            <div>
              <span className="text-xs">登録済みの方はこちら</span>
              <LoginButton />
            </div>
          </div>
          {/* <Link href="/home" className="hover:group">
          <div className="group ml-3 mr-14 mt-6 rounded-xl py-1.5 pl-4 transition duration-75 ease-in-out hover:bg-[#FBB87F] hover:text-orange-500">
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="mr-2 w-5 group-hover:scale-110"
            />
            使い方
          </div>
        </Link> */}
          <div className="mt-10 scale-125">
            <p className="mb-1 text-xs">まずは試してみる！</p>
            <GuestLoginButton />
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};

export default Guidance;
