import { faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import router from 'next/router';
import React, { useRef, useState } from 'react';
import { PostButton } from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';
import useAuth from '@/hooks/auth/useAuth';
import useS3 from '@/hooks/auth/useS3';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { auth } = useAuth();
  const imageForm = useRef<HTMLInputElement>(null);
  // S3のカスタムフック(S3への画像アップロード処理をまとめたもの)
  const { uploadImageToS3 } = useS3();

  // レシピを投稿（データベースへの登録）する関数
  const postRecipe = async () => {
    // 画像が存在する場合は、S3にアップロードし、そのURLを取得する
    if (image) {
      const imageUrl = await uploadImageToS3(image);
      // URLの取得に失敗した場合はエラーメッセージを表示して処理を終了する
      if (!imageUrl) {
        alert('画像のアップロードに失敗しました');
        return;
      }

      // レシピ情報を送信するリクエスト
      const response = await axios.post('/recipes', {
        recipe: {
          title: title,
          content: content,
          time: time,
          price: price,
          calorie: calorie,
          image: imageUrl, // 画像のURLを送信する
        },
      });
      console.log('レシピの投稿に成功しました', response.data);
      alert('レシピの投稿に成功しました');
      await router.push('/home');
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
      setPreview(null);
    }
  };

  // この下からリターンの中身
  return (
    <div>
      {auth.currentUser ? (
        <div>
          <div className="text-center text-[#68B68D]">
            <FontAwesomeIcon icon={faPen} className="text-6xl" />
            <div className="mt-2 text-2xl">レシピ投稿</div>
          </div>
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
            placeholder="例）じゃがりこマッシュポテト"
            witdh="w-full"
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
              placeholder="5分"
              witdh="w-1/3"
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
              placeholder="300"
              witdh="w-1/3"
              type="number"
              min={0}
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
              placeholder="500"
              witdh="w-1/3"
              type="number"
              min={0}
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
