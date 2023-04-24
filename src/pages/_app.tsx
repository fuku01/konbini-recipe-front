import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-orange-50 text-black">
      <div className="mx-auto flex min-h-screen flex-col bg-white lg:w-1/3">
        <Header />
        <div className="flex-1 px-8 pb-10 pt-5">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
