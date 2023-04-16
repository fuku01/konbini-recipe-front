import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='bg-pink-50 text-black overflow-scroll'>
      <div className='mx-auto lg:w-1/3 bg-white'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
