import { faCheck, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { CheckButton, DeleteButton } from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  time: number;
  calorie: number;
  image: string | undefined;
  created_at: Date;
  updated_at: Date;
  price: number;
};

const EditRecipe = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null);

  // 以下のコードはレシピの詳細ページを表示するためのコード。
  // useRouterを使って、URLのパラメーターからIDを取得しています。
  // そのIDを使って、axiosを使って、レシピの詳細を取得しています。
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  // レシピの取得
  const getRecipe = useCallback(async () => {
    const response = await axios.get<Recipe>('/recipes/' + id);
    setRecipe(response.data);
    console.log('レシピの取得に成功しました', response.data);
  }, [id]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  // フォームの初期値に現在登録されているレシピ情報を表示させる処理
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title ? recipe.title : '');
      setContent(recipe.content ? recipe.content : '');
      setTime(recipe.time ? recipe.time.toString() : '');
      setPrice(recipe.price ? recipe.price.toString() : '');
      setCalorie(recipe.calorie ? recipe.calorie.toString() : '');
    }
  }, [recipe]);

  // 編集したレシピを送信する処理
  const editRecipe = async () => {
    const respomse = await axios.put('/recipes/' + id, {
      recipe: {
        title: title,
        content: content,
        time: time,
        price: price,
        calorie: calorie,
        image: image,
      },
    });
    alert('レシピを更新しました');
    await router.push('/myrecipe');
    console.log('レシピの更新に成功しました', respomse.data);
  };

  const deleteRecipe = async () => {
    const respomse = await axios.delete('/recipes/' + id);
    alert('レシピを削除しました');
    await router.push('/myrecipe');
    console.log('レシピの削除に成功しました', respomse.data);
  };

  return (
    <div>
      <div className="text-center text-[#68B68D]">
        <FontAwesomeIcon icon={faFilePen} className="text-6xl" />
        <div className="mr-1 mt-2 text-2xl">レシピ編集</div>
      </div>
      <TextForm
        label="レシピタイトル"
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
          label={
            <div>
              調理時間
              <br />
              <div className="ml-14 text-xs">（分）</div>
            </div>
          }
          witdh="w-1/3"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <TextForm
          label={
            <div>
              金額
              <br />
              <div className="ml-14 text-xs">（円）</div>
            </div>
          }
          witdh="w-1/3"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <TextForm
          label={
            <div>
              カロリー
              <br />
              <div className="ml-14 text-xs">（kcal）</div>
            </div>
          }
          witdh="w-1/3"
          value={calorie}
          onChange={(e) => {
            setCalorie(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-end space-x-6">
        <div className="mt-14">
          <CheckButton
            onClick={() => {
              editRecipe();
              console.log('クリック！！');
            }}
          >
            {' '}
            <FontAwesomeIcon icon={faCheck} />
          </CheckButton>
        </div>
        <div className="mt-14">
          <DeleteButton
            onClick={() => {
              deleteRecipe();
              console.log('クリック！！');
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteButton>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
