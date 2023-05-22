import { config } from '@fortawesome/fontawesome-svg-core'; // これがないとアイコンがバグる
import axios from 'axios';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import useAuth from '@/hooks/auth/useAuth';
import '@fortawesome/fontawesome-svg-core/styles.css'; // これがないとアイコンがバグる
config.autoAddCss = false; // これがないとアイコンがバグる

export default function App({ Component, pageProps }: AppProps) {
  const { isWaitingUser, currentUser } = useAuth();

  // ログインユーザーがいる場合にトークンをセット。
  // ※【注意】useEffectの中では使えない！!この書き方にする必要がある！
  if (currentUser) {
    currentUser.getIdToken().then((token) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
  }

  // axiosのデフォルトURLを設定
  axios.defaults.baseURL = process.env.API_HOST;

  return (
    <div className="bg-orange-50 text-[#75665C]">
      {/* ↓ここにボーダーを入れるとフッターアイコンがズレるので注意 */}
      <div className="mx-auto flex h-screen w-screen flex-col bg-white outline outline-2 outline-[#FDF1DE] lg:w-1/3 ">
        <Header />
        <div className="flex-1 overflow-y-auto overscroll-none px-4 pb-36 pt-5 lg:px-6 lg:pb-10">
          {/* ログインユーザーがいない場合はロード中を表示 */}
          {isWaitingUser ? (
            <p>ロード中...</p>
          ) : (
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
