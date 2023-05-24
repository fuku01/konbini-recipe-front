import { config } from '@fortawesome/fontawesome-svg-core'; // これがないとアイコンがバグる
import axios from 'axios';
import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // これがないとアイコンがバグる
config.autoAddCss = false; // これがないとアイコンがバグる

export default function App({ Component, pageProps }: AppProps) {
  // axiosのデフォルトURLを設定
  axios.defaults.baseURL = process.env.API_HOST;

  return (
    <div className="bg-orange-50 text-[#75665C]">
      {/* ↓ここにボーダーを入れるとフッターアイコンがズレるので注意 */}
      <div className="mx-auto flex h-screen w-screen flex-col bg-white outline outline-2 outline-[#FDF1DE] lg:w-1/3 ">
        <Header />
        <div className="flex-1 overflow-y-auto overscroll-none px-4 pb-36 pt-5 lg:px-6 lg:pb-10">
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </div>
        <Footer />
      </div>
    </div>
  );
}
