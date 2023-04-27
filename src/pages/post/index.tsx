import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import axios from 'axios';
import router from 'next/router';
import React, { useState } from 'react';
import { PostButton } from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';
import useAuth from '@/hooks/auth/useAuth';

// S3の設定
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// S3に画像をアップロードし、そのURLを取得する関数
const uploadImageToS3 = async (file: File) => {
  // アップロード時のファイル名を作成
  const fileName = `${Date.now()}-${file.name}`;
  // S3へのアップロードに必要な情報をまとめるオブジェクト
  const params: PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME ? process.env.S3_BUCKET_NAME : '',
    Key: fileName,
    ContentType: file.type,
    Body: file,
  };
  // Bucket: アップロード先のバケット名を環境変数から取得します。
  // Key: アップロードするファイルのキーを指定します。
  // ContentType: アップロードするファイルのMIMEタイプを指定します。
  // Body: アップロードするファイルデータを指定します。

  try {
    // S3に画像をアップロードする
    const data = await s3.upload(params).promise();
    // アップロード成功時の処理
    console.log('画像アップロード成功:', data.Location);
    // アップロードされた画像のURLを取得
    return data.Location;
  } catch (error) {
    // アップロードエラー発生時の処理
    console.error('画像アップロードエラー:', error);
    // null値を返す
    return null;
  }
};

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const { auth } = useAuth();

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
      console.log(response);
      console.log('レシピの投稿に成功しました', response.data);
      alert('レシピの投稿に成功しました');
      await router.push('/home');
    }

    // 画像が選択されていない場合、アラートを表示する
    else {
      alert('画像を選択してください');
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
            type="file"
            className="w-full"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
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
