import {
  faBarcode,
  faCamera,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import BarcodeModal from '@/components/BarcodeModal';
import { TagButton, BarcodeButton, PostButton } from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';
import useAuth from '@/hooks/auth/useAuth';
import useS3 from '@/hooks/s3/useS3';

// レシピ投稿時に送信するデータの型
type RecipeRequestData = {
  recipe: {
    title: string;
    content: string;
    time: string;
    price: string;
    calorie: string;
    image: string;
    barcodetags_attributes?: {
      barcode: string;
      name: string;
    }[];
  };
};

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [barcode, setBarcode] = useState<string>('');
  const [barcodeName, setBarcodeName] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [previewTag, setPreviewTag] = useState<string | null>(null);

  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const { currentUser } = useAuth();
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
      const data: RecipeRequestData = {
        recipe: {
          title: title,
          content: content,
          time: time,
          price: price,
          calorie: calorie,
          image: imageUrl, // 画像のURLを送信する
        },
      };
      // バーコードが入力されている場合だけ、バーコード情報も送信する（空のバーコードテーブルを作成しないために条件分岐させている）
      if (barcode) {
        data.recipe.barcodetags_attributes = [
          {
            barcode: barcode,
            name: barcodeName,
          },
        ];
      }
      const response = await axios.post('/recipes', data);

      console.log('レシピの投稿に成功しました', response.data);
      alert('レシピの投稿に成功しました');
      await router.push('/home');
    }

    // 画像が選択されていない場合、アラートを表示する
    else {
      alert('画像を選択してください');
    }
  };

  // 画像の形式バリデーションとプレビュー表示を行う関数
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

  // 未入力の必須項目がある場合のエラー表示を行う関数
  const getErrorMessage = () => {
    const errorMessages = [];
    if (!image) {
      errorMessages.push('写真');
    }
    if (!title) {
      errorMessages.push('レシピタイトル');
    }
    if (!content) {
      errorMessages.push('作り方');
    }
    if (errorMessages.length > 0) {
      return '※' + errorMessages.join('・') + 'は必須です！';
    }
    return '';
  };

  useEffect(() => {
    // 入力したタグを配列に追加する
    const tags = tag.split(' ');
    console.log(tags);
  }, [tag]);

  // この下からリターンの中身
  if (currentUser) {
    return (
      <div>
        <div className="relative">
          {isBarcodeModalOpen && (
            <BarcodeModal
              isBarcodeModalOpen={isBarcodeModalOpen}
              setIsBarcodeModalOpen={setIsBarcodeModalOpen}
              setBarcode={setBarcode}
              setBarcodeName={setBarcodeName}
            />
          )}
          <div className="mt-2 text-center text-2xl text-[#68B68D]">
            レシピ投稿
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
            // 画像が選択されている場合は、プレビューを表示する
            <img
              className="mx-auto mt-4 h-52 w-72 cursor-pointer rounded-3xl border-4 border-solid border-[#FBB87F] object-cover shadow-md"
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
            // 画像が選択されていない場合は、プレビューを表示しない
            <div
              className="mx-auto mt-4 flex h-52 w-72 cursor-pointer flex-col items-center justify-center rounded-3xl border-4 border-dashed border-gray-400 text-gray-500 shadow-sm hover:border-orange-500"
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
            placeholder="※ 必須(40文字以内)"
            witdh="w-full"
            maxLength={40}
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
            placeholder="※ 必須(1,000文字以内)"
            witdh="w-full"
            label="作り方"
            maxLength={1000}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <div className="flex items-center justify-between">
            <TextForm
              label="タグ"
              placeholder="タグを追加する"
              witdh="w-full"
              onChange={(e) => {
                setPreviewTag(e.target.value);
              }}
            />
            <div className="ml-1 mr-4 mt-16">
              <TagButton
                onClick={() => {
                  setTag(tag + previewTag);
                  setPreviewTag('');
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </TagButton>
            </div>
            <div className="mt-14">
              <BarcodeButton
                onClick={() => {
                  setIsBarcodeModalOpen(!isBarcodeModalOpen);
                }}
              >
                <FontAwesomeIcon icon={faBarcode} className="text-2xl" />
              </BarcodeButton>
            </div>
          </div>
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
              placeholder="300"
              witdh="w-1/3"
              type="number"
              min={0}
              max={9999}
              value={price}
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  setPrice(e.target.value);
                }
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
              max={9999}
              value={calorie}
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  setCalorie(e.target.value);
                }
              }}
            />
          </div>
          <div className="mt-14 text-right">
            <PostButton
              disabled={!title || !content || !image}
              onClick={() => {
                postRecipe();
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </PostButton>
            {/* 未入力項目があればエラーを表示する */}
            <div>
              {getErrorMessage() ? (
                <div className="mt-3 text-sm text-red-500">
                  {getErrorMessage()}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>ログインしてください</div>;
  }
};

export default Post;
