import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='text-center'>
        <Link href='/home'>
          <div className='font-bold text-xl my-3'>ホーム</div>
        </Link>
        <Link href='/myrecipe'>
          <div className='font-bold text-xl my-3'>マイレシピ</div>
        </Link>
        <Link href='/post'>
          <div className='font-bold text-xl my-3'>投稿</div>
        </Link>
        <Link href='/signup'>
          <div className='font-bold text-xl my-3'>サインアップ</div>
        </Link>
      </div>
      <div>人気ランキング</div>
      <div>新着レシピ</div>
      <div>閲覧履歴</div>
    </div>
  )
}
export default Home
