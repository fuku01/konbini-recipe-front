import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import router, { Router } from 'next/router';
import React, { useState } from 'react';
import { PostButton } from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';
import useAuth from '@/hooks/auth/useAuth';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { auth } = useAuth();

  // レシピの投稿処理
  const postRecipe = async () => {
    const response = await axios.post('/recipes', {
      recipe: {
        title: title,
        content: content,
        time: time,
        price: price,
        calorie: calorie,
        image: image,
      },
    });
    console.log(response);
    console.log('レシピの投稿に成功しました', response.data);
    alert('レシピの投稿に成功しました');
    await router.push('/home');
  };

  // この下からリターンの中身
  return (
    <div>
      {auth.currentUser ? (
        <div>
          <TextForm
            label="レシピタイトル"
            placeholder="例）じゃがりこマッシュポテト"
            witdh="w-full"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextForm
            label="カテゴリ"
            placeholder="※未実装（仮でフォームを置いてる）"
            witdh="w-full"
          />
          <TextFormArea
            placeholder="例）じゃがりこをレンジで５分温めるとマッシュポテトになります。"
            witdh="w-full"
            label="作り方"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <TextForm
            label="バーコードタグ"
            placeholder="※未実装（仮でフォームを置いてる）"
            witdh="w-full"
          />
          <div className="flex space-x-5">
            <SelectForm
              label="調理時間"
              placeholder="5分"
              witdh="w-1/3"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            <TextForm
              label="金額"
              placeholder="300円"
              witdh="w-1/3"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <TextForm
              label="カロリー"
              placeholder="500kcal"
              witdh="w-1/3"
              value={calorie}
              onChange={(e) => {
                setCalorie(e.target.value);
              }}
            />
          </div>
          <div className="mt-14 text-right">
            <PostButton
              onClick={() => {
                console.log('クリック！！');
                postRecipe();
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </PostButton>
          </div>
        </div>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
};

export default Post;
