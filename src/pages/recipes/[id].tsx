import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faFire, faYenSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

const Recipe = () => {
  const router = useRouter()
  const { id } = router.query
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)

  // レシピの取得
  const getRecipe = useCallback(() => {
    axios
      .get<Recipe>('http://localhost:8000/recipes/' + id)
      .then((response) => {
        setRecipe(response.data)
        console.log('レシピの取得に成功しました', response.data)
      })
      .catch((error) => {
        console.log('レシピの取得に失敗しました', error)
      })
  }, [id])

  useEffect(() => {
    getRecipe()
  }, [getRecipe])

  // 分アイコンの色を変える関数
  const GetTimeColor = () => {
    if (!recipe?.time) {
      return 'text-gray-400'
    } else if (recipe.time < 5) {
      return 'text-green-400'
    } else if (recipe.time < 20) {
      return 'text-yellow-400'
    } else {
      return 'text-red-400'
    }
  }
  // 金額アイコンの色を変える関数
  const GetPriceColor = () => {
    if (!recipe?.price) {
      return 'text-gray-400'
    } else if (recipe.price < 500) {
      return 'text-green-400'
    } else if (recipe.price < 2000) {
      return 'text-yellow-400'
    } else {
      return 'text-red-400'
    }
  }
  // カロリーアイコンの色を変える関数
  const GetCalorieColor = () => {
    if (!recipe?.calorie) {
      return 'text-gray-400'
    } else if (recipe.calorie < 500) {
      return 'text-green-400'
    } else if (recipe.calorie < 1000) {
      return 'text-yellow-400'
    } else {
      return 'text-red-400'
    }
  }

  return (
    <div>
      <div>画像</div>
      <div className='text-xl bg-[#FDF1DE] rounded-md mx-2 pl-5 py-1 mb-5 shadow-md'>
        {' '}
        {recipe?.title}
      </div>
      <div className='flex justify-around'>
        <div className='inline-flex flex-col items-center bg-[#FDF1DE] min-w-[5rem] py-3 rounded-2xl shadow-md'>
          <FontAwesomeIcon icon={faClock} className={'text-5xl mb-2 ' + GetTimeColor()} />
          <div className='inline-flex justify-center items-center'>
            {recipe?.time ? recipe.time : '-'}
            <span className='text-xs ml-1'>分</span>
          </div>
        </div>
        <div className='inline-flex flex-col bg-[#FDF1DE] min-w-[5rem] py-3 rounded-2xl shadow-md'>
          <FontAwesomeIcon icon={faYenSign} className={'text-5xl mb-2 ' + GetPriceColor()} />
          <div className='inline-flex justify-center items-center'>
            {recipe?.price ? recipe.price.toLocaleString() : '-'}
            <span className='text-xs ml-1'>円</span>
          </div>
        </div>
        <div className='inline-flex flex-col bg-[#FDF1DE] min-w-[5rem] py-3 rounded-2xl shadow-md'>
          <FontAwesomeIcon icon={faFire} className={'text-5xl mb-2 ' + GetCalorieColor()} />
          <div className='inline-flex justify-center items-center'>
            {recipe?.calorie ? recipe.calorie.toLocaleString() : '-'}
            <span className='text-xs ml-1'>kcal</span>
          </div>
        </div>
      </div>
      <div className='my-5 text-orange-500'>カテゴリ</div>
      <div className='my-1 text-orange-500'>作り方</div>
      <div className='bg-[#FDF1DE] rounded-sm shadow-md px-2 py-2 '>{recipe?.content}</div>
      <div className='my-5 text-orange-500'>バーコードタグ</div>
    </div>
  )
}
export default Recipe
