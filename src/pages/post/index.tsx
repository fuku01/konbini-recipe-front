import { log } from 'console'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { PostButton } from '@/components/Button'
import TextForm from '@/components/TextForm'
import TextFormArea from '@/components/TextFormArea'

const Post = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [time, setTime] = useState('')
  const [price, setPrice] = useState('')
  const [calorie, setCalorie] = useState('')

  const postRecipe = () => {
    axios.post('http://localhost:8000/recipes', {
      recipe: {
        user_id: 1, // ユーザーIDを追加
        title: title,
        content: content,
        time: time,
        price: price,
        calorie: calorie,
      },
    })
  }

  //
  //
  //
  //
  // この下からリターンの中身
  return (
    <div className='px-5 py-5'>
      <p className='text-center text-4xl mb-10'>レシピ投稿画面</p>
      <input type='file' />
      <TextForm
        label='レシピタイトル'
        placeholder='例）じゃがりこマッシュポテト'
        witdh='w-full'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
      />
      <TextForm label='カテゴリ' placeholder='※未実装（仮でフォームを置いてる）' witdh='w-full' />
      <TextFormArea
        placeholder='例）じゃがりこをレンジで５分温めるとマッシュポテトになります。'
        witdh='w-full'
        label='説明'
        value={content}
        onChange={(e) => {
          setContent(e.target.value)
        }}
      />
      <TextForm
        label='バーコードタグ'
        placeholder='※未実装（仮でフォームを置いてる）'
        witdh='w-full'
      />
      <div className='flex space-x-5'>
        <TextForm
          label='調理時間'
          placeholder='30分'
          witdh='w-1/3'
          value={time}
          onChange={(e) => {
            setTime(e.target.value)
          }}
        />
        <TextForm
          label='金額'
          placeholder='300円'
          witdh='w-1/3'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
          }}
        />
        <TextForm
          label='カロリー'
          placeholder='500kcal'
          witdh='w-1/3'
          value={calorie}
          onChange={(e) => {
            setCalorie(e.target.value)
          }}
        />
      </div>
      <div className='text-right mt-5'>
        <PostButton
          onClick={() => {
            console.log('クリック！！')
            postRecipe()
          }}
        >
          投稿
        </PostButton>
      </div>
    </div>
  )
}

export default Post
