import { Input, Select, Option, Textarea } from '@material-tailwind/react'
import { PostButton } from '@/components/Button'
import TextForm from '@/components/TextForm'
import TextFormArea from '@/components/TextFormArea'

const Post = () => {
  return (
    <div className='px-5 py-5'>
      <p className='text-center text-4xl mb-10'>レシピ投稿画面</p>
      {/* <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>画像</p> */}
      <input type='file' />
      {/* <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>レシピタイトル</p> */}
      <TextForm label='レシピタイトル' placeholder='例）じゃがりこマッシュポテト' witdh='w-full' />
      {/* <div className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>カテゴリ</div> */}
      <TextForm label='カテゴリ' placeholder='※未実装（仮でフォームを置いてる）' witdh='w-full' />
      {/* <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>説明</p> */}
      <TextFormArea
        placeholder='例）じゃがりこをレンジで５分温めるとマッシュポテトになります。'
        witdh='w-full'
        label='説明'
      />
      {/* <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>バーコードタグ</p> */}
      <TextForm
        label='バーコードタグ'
        placeholder='※未実装（仮でフォームを置いてる）'
        witdh='w-full'
      />
      <div className='flex space-x-5'>
        {/* <div className='w-1/3'> */}
        {/* <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>調理時間</p> */}
        <TextForm label='調理時間' placeholder='30分' witdh='w-1/3' />
        {/* <Select color='orange' variant='static'>
            <Option>1分</Option>
            <Option>3分</Option>
            <Option>5分</Option>
            <Option>10分</Option>
            <Option>20分</Option>
            <Option>30分</Option>
            <Option>40分以上</Option>
          </Select> */}
        {/* </div> */}
        {/* <div className='w-1/3'>
          <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>金額</p> */}
        <TextForm label='金額' placeholder='300円' witdh='w-1/3' />
        {/* </div> */}
        {/* <div className='w-1/3'>
          <p className='bg-orange-50 mt-2 pl-3 text-1xl text-left'>カロリー</p> */}
        <TextForm label='カロリー' placeholder='500kcal' witdh='w-1/3' />
        {/* </div> */}
      </div>
      <div className='text-right mt-5'>
        <PostButton>投稿</PostButton>
      </div>
    </div>
  )
}

export default Post
