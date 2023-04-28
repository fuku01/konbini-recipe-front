import { faCamera, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckButton, DeleteButton } from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';
import useS3 from '@/hooks/auth/useS3';

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
  const [preview, setPreview] = useState<string | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const imageForm = useRef<HTMLInputElement>(null);
  // S3のカスタムフック(S3への画像アップロード処理をまとめたもの)
  const { uploadImageToS3 } = useS3();

  // 以下のコードはレシピの詳細ページを表示するためのコード。
  // useRouterを使って、URLのパラメーターからIDを取得しています。
  // そのIDを使って、axiosを使って、レシピの詳細を取得しています。
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  // ページ開いたらレシピの取得をする処理
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
      setDefaultImage(recipe.image ? recipe.image : null);
      setPreview(recipe.image ? recipe.image : null);
    }
  }, [recipe]);

  // レシピを削除する関数
  const deleteRecipe = async () => {
    const respomse = await axios.delete('/recipes/' + id);
    alert('レシピを削除しました');
    await router.push('/myrecipe');
    console.log('レシピの削除に成功しました', respomse.data);
  };

  const editPostRecipe = async () => {
    // 画像が存在する場合は、S3にアップロードし、そのURLを取得する
    if (image) {
      const imageUrl = await uploadImageToS3(image);
      // URLの取得に失敗した場合はエラーメッセージを表示して処理を終了する
      if (!imageUrl) {
        alert('画像のアップロードに失敗しました');
        return;
      }
      const respomse = await axios.put('/recipes/' + id, {
        recipe: {
          title: title,
          content: content,
          time: time,
          price: price,
          calorie: calorie,
          image: imageUrl,
        },
      });
      console.log('レシピの更新に成功しました', respomse.data);
      alert('レシピを更新しました');
      await router.push('/myrecipe');
    }
    // 画像が選択されていない場合、アラートを表示する
    else {
      alert('画像を選択してください');
    }
  };
  // 画像の形式チェックとプレビュー表示を行う関数
  const imageCheck = (fileList: FileList) => {
    if (fileList[0]) {
      const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!imageTypes.includes(fileList[0].type)) {
        alert('許可されていないファイルタイプです。');
        return;
      }
      setImage(fileList[0]);
      setPreview(URL.createObjectURL(fileList[0]));
    } else {
      setImage(null);
      setPreview(defaultImage);
    }
  };

  return (
    <div>
      <div className="mt-2 text-center text-2xl text-[#68B68D]">レシピ編集</div>
      {/* 写真編集 */}
      <input
        ref={imageForm}
        type="file"
        className="hidden w-full"
        accept="image/*"
        onChange={(e) => {
          const fileList = e.target.files;
          if (fileList) {
            imageCheck(fileList);
          }
        }}
      />
      {preview ? (
        <Image
          className="mx-auto h-52 w-72 cursor-pointer rounded-3xl border-4 border-solid border-[#FBB87F] object-cover shadow-md"
          onClick={() => {
            if (imageForm.current) {
              imageForm.current.click();
            }
          }}
          src={preview}
          alt="プレビュー"
          width={300}
          height={200}
        />
      ) : (
        <div
          className="mx-auto mt-4 flex h-52 w-72 cursor-pointer flex-col items-center justify-center rounded-3xl border-4 border-dashed border-gray-400 text-gray-500 shadow-sm"
          onClick={() => {
            if (imageForm.current) {
              imageForm.current.click();
            }
          }}
        >
          <FontAwesomeIcon icon={faCamera} className="text-8xl" />
          <div className="text-2xl">写真</div>
        </div>
      )}
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
              editPostRecipe();
              console.log('クリック！！');
            }}
          >
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
