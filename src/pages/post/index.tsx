import {
  faBarcode,
  faCamera,
  faCircleXmark,
  faClock,
  faFileLines,
  faFire,
  faPen,
  faPlus,
  faTag,
  faUtensils,
  faYenSign,
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

type Tag = {
  id?: number;
  name: string;
};

// レシピ投稿時に送信するデータの型
type RecipeRequestData = {
  recipe: {
    title: string;
    content: string;
    time: string;
    price: string;
    calorie: string;
    image: string;
    tags_attributes?: Tag[];
  };
};

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); //画像のプレビューを表示するためのstate
  const [barcode, setBarcode] = useState<string>('');

  const [tempTag, setTempTag] = useState<string>(''); //フロントで一時的にタグを保持するためのstate
  const [tags, setTags] = useState<Tag[]>([]); //送信するためのタグ配列を保持するためのstate

  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  const { token } = useAuth();
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
      //タグが一つ以上入力されている場合だけ、タグ情報も送信する（空のタグテーブルを作成しないために条件分岐させている）
      if (tags.length > 0) {
        // タグの配列を、送信するデータの形式に合わせて変換する。例：['タグ1', 'タグ2'] => [{name: 'タグ1'}, {name: 'タグ2'}]　※この変換を行わないと、Rails側でタグの保存ができない
        data.recipe.tags_attributes = tags;
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

  // タグ追加のロジックをまとめた関数
  const addTag = () => {
    // タグの数が 5 以下の場合のみ、タグを追加できるようにする。
    if (tempTag && tags.length <= 5) {
      setTags([...tags, { name: tempTag }]);
      setTempTag('');
    }
  };

  // バーコードに値が入ったら、タグにその値を追加する関数
  useEffect(() => {
    if (barcode) {
      setTags((prevTags) => [...prevTags, { name: barcode }]);
      setBarcode('');
    }
  }, [barcode]);

  // _destroyがfalseのタグのみを確認するためのuseEffect
  useEffect(() => {
    console.log('最新のタグ配列', tags);
  }, [tags]);

  // この下からリターンの中身
  if (token) {
    return (
      <div className="select-none">
        <div className="relative">
          {isBarcodeModalOpen && (
            <BarcodeModal
              isBarcodeModalOpen={isBarcodeModalOpen}
              setIsBarcodeModalOpen={setIsBarcodeModalOpen}
              setBarcode={setBarcode}
            />
          )}
          <input
            ref={imageForm}
            type="file"
            className="hidden w-full"
            accept="image/*" //画像のみを選択できるようにする
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
              className="mx-auto h-52 w-72 cursor-pointer rounded-2xl border-4 border-solid border-[#FBB87F] object-cover shadow-md"
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
              className="mx-auto flex h-52 w-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-4 border-dashed border-gray-400 text-gray-500 hover:border-orange-500"
              onClick={() => {
                if (imageForm.current) {
                  imageForm.current.click();
                }
              }}
            >
              <FontAwesomeIcon icon={faCamera} className="text-8xl" />
              <div className="text-2xl">写真選択</div>
            </div>
          )}
          <TextForm
            label="レシピタイトル"
            labelIcon={faFileLines}
            placeholder="※ 必須(20文字以内)"
            width="w-full"
            maxLength={20}
            value={title}
            onChange={(e) => {
              const newValue = e.target.value;
              const trimmedValue = newValue.trimStart();
              setTitle(trimmedValue);
            }}
          />
          <TextFormArea
            placeholder="※ 必須(500文字以内)"
            width="w-full"
            label="作り方"
            labelIcon={faUtensils}
            maxLength={500}
            value={content}
            onChange={(e) => {
              const newValue = e.target.value;
              const trimmedValue = newValue.trimStart();
              setContent(trimmedValue);
            }}
          />
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTag();
                }}
                className="w-full"
              >
                <TextForm
                  label="タグ"
                  labelIcon={faTag}
                  placeholder="※ 5個以内(15文字以内)"
                  width="w-full"
                  value={tempTag}
                  maxLength={15}
                  disabled={tags.length >= 5}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const trimmedValue = newValue.trimStart();
                    setTempTag(trimmedValue);
                  }}
                />
              </form>
              <div className="ml-1 mr-4 mt-16">
                <TagButton onClick={addTag} disabled={tags.length >= 5}>
                  <FontAwesomeIcon icon={faPlus} className="text-lg" />
                </TagButton>
              </div>
              <div className="mt-14">
                <BarcodeButton
                  onClick={() => {
                    setIsBarcodeModalOpen(!isBarcodeModalOpen);
                  }}
                  disabled={tags.length >= 5}
                >
                  <FontAwesomeIcon icon={faBarcode} className="text-2xl" />
                </BarcodeButton>
              </div>
            </div>
            <div className="flex flex-wrap">
              {/* _destroyがtrueのもの以外の、tags配列の中身を表示 */}
              {tags.map((tag, index) => {
                return (
                  <div key={index} className="flex">
                    <div className="mr-3 mt-2 rounded-md bg-[#FDF1DE] px-1 py-0.5 shadow-md">
                      {/* 4桁以上で数字のみのタグにはバーコードアイコンを表示させる */}{' '}
                      {tag.name.match(/^\d{4,}$/) ? (
                        <FontAwesomeIcon icon={faBarcode} className="mr-1 " />
                      ) : (
                        '# '
                      )}
                      {tag.name}
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="ml-1 cursor-pointer text-[#FEABAE] transition duration-75 ease-in-out hover:scale-105 hover:text-[#F16B6E]"
                        onClick={() => {
                          // xボタンを押したタグのみを除外した新しい配列を作る
                          const newTags = tags.filter((_, Index) => {
                            return Index !== index;
                          });
                          // setTagsに新しい配列を渡す
                          setTags(newTags);
                        }}
                      />
                    </div>
                  </div>
                );
                // }
              })}
            </div>
          </div>
          <div className="flex space-x-5">
            <SelectForm
              label={
                <>
                  調理時間
                  <br />
                  <div className="ml-14 mt-1 text-xs lg:ml-24">（分）</div>
                </>
              }
              labelIcon={faClock}
              placeholder="5分"
              width="w-1/3"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            />
            <TextForm
              label={
                <>
                  金額
                  <br />
                  <div className="ml-14 mt-1 text-xs lg:ml-24">（円）</div>
                </>
              }
              labelIcon={faYenSign}
              placeholder="未入力"
              width="w-1/3"
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
                <>
                  カロリー
                  <br />
                  <div className="ml-14 mt-1 text-xs lg:ml-20">（kcal）</div>
                </>
              }
              labelIcon={faFire}
              placeholder="未入力"
              width="w-1/3"
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
    return;
  }
};

export default Post;
