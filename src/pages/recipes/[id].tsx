import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

type Recipe = {
  id: number
  user_id: number
  title: string
  content: string
  time: number
  calorie: number
  image: string
  created_at: Date
  updated_at: Date
  price: number
}

const Rcipes = () => {
  const router = useRouter()
  const { id } = router.query
  const [recipes, setRecipes] = useState<Recipe[]>([])

  const getRecipes = useCallback(() => {
    axios
      .get<Recipe[]>('http://localhost:8000//recipes/' + id)
      .then((response) => {
        setRecipes(response.data)
        console.log('レシピの取得に成功しました', response.data)
      })
      .catch((error) => {
        console.log('レシピの取得に失敗しました', error)
      })
  }, [id])

  useEffect(() => {
    getRecipes()
  }, [getRecipes])

  return (
    <div>
      <p>画像</p>
      <div>レシピタイトル</div>
      <p>カテゴリ</p>
      <p>作り方</p>
      <p>バーコードタグ</p>
      <div className='flex space-x-5'>
        <p>調理時間</p>
        <p>金額</p>
        <p>カロリー</p>
      </div>
    </div>
  )
}
export default Rcipes
