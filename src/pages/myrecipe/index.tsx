import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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

const Myrecipe = () => {
  const [myrecipe, setMyrecipe] = useState<Recipe[]>([])

  const getMyrecipes = () => {
    axios
      .get<Recipe[]>('http://localhost:8000/user_recipes')
      .then((response) => {
        setMyrecipe(response.data)
        console.log('マイレシピの取得に成功しました', response.data)
      })
      .catch((error) => {
        console.log('マイレシピの取得に失敗しました', error)
      })
  }
  useEffect(() => {
    getMyrecipes()
  }, [])

  return (
    <div>
      <div className='text-center text-2xl'>マイレシピ</div>
      <div>
        {myrecipe.map((recipe) => (
          <div
            key={recipe.id}
            className='bg-[#FFFAF2] hover:bg-[#FDF1DE] rounded-lg shadow-md hover:shadow-lg py-5 my-5'
          >
            <Link href={`/recipes/${recipe.id}`}>
              <div
                className='text-xl font-semibold'
                onClick={() => {
                  console.log(recipe.id, '←このIDのレシピをクリックしました')
                }}
              >
                （{recipe.id}）{recipe.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Myrecipe
