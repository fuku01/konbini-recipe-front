import axios from 'axios';
import type { AppProps } from 'next/app';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import useAuth from '@/hooks/auth/useAuth';

export default function App({ Component, pageProps }: AppProps) {
  const { auth } = useAuth();
  // ログインユーザーがいる場合
  if (auth.currentUser) {
    auth.currentUser.getIdToken().then((token) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
  }

  axios.defaults.baseURL = process.env.API_HOST;

  return (
    <div className="w-screen bg-orange-50 text-black">
      <div className="lg: mx-auto flex min-h-screen w-screen flex-col bg-white lg:w-1/3">
        <Header />
        <div className="flex-1 px-6 pb-10 pt-5 lg:px-8">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
