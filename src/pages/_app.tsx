import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className=' bg-orange-50 text-black min-h-screen'>
      <div className='mx-auto lg:w-1/4 bg-white flex flex-col min-h-screen'>
        <Header />
        <div className='px-8 pt-5 pb-10 flex-1'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </div>
  )
}
