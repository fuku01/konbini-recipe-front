import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import router, { Router } from 'next/router'
import React, { useState } from 'react'
import { PostButton } from '@/components/Button'
import TextForm from '@/components/TextForm'
import TextFormArea from '@/components/TextFormArea'

const Post = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [time, setTime] = useState('')
  const [price, setPrice] = useState('')
  const [calorie, setCalorie] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const postRecipe = () => {
    axios
      .post('http://localhost:8000/recipes', {
        recipe: {
          title: title,
          content: content,
          time: time,
          price: price,
          calorie: calorie,
          image: image,
        },
      })
      .then((response) => {
        router.push('/home')
        alert('レシピの投稿に成功しました')
        console.log('レシピの投稿に成功しました', response.data)
      })
      .catch((error) => {
        console.log('レシピの投稿に失敗しました', error)
      })
  }

  // この下からリターンの中身
  return (
    <div>
      <input
        className=''
        type='file'
        onChange={(e) => {
          setImage(e.target.files?.[0] || null)
        }}
      />
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
        label='作り方'
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
      <div className='text-right mt-14'>
        <PostButton
          onClick={() => {
            console.log('クリック！！')
            postRecipe()
          }}
        >
          <FontAwesomeIcon icon={faShare} />
        </PostButton>
      </div>
    </div>
  )
}

export default Post
