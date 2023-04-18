import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='text-center'>
      <div className='font-bold text-2xl mb-20'>仮のページ一覧</div>
      <Link href='/home'>
        <div className='font-bold text-xl my-3'>ホーム</div>
      </Link>
      <Link href='/myrecipe'>
        <div className='font-bold text-xl my-3'>マイレシピ</div>
      </Link>
      <Link href='/recipe'>
        <div className='font-bold text-xl my-3'>レシピ詳細</div>
      </Link>
      <Link href='/post'>
        <div className='font-bold text-xl my-3'>投稿</div>
      </Link>
      <Link href='/signup'>
        <div className='font-bold text-xl my-3'>サインアップ</div>
      </Link>
    </div>
  )
}
export default Home
