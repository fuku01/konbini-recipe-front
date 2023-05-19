import {
  faBarcode,
  faCamera,
  faCircleXmark,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BarcodeModal from '@/components/BarcodeModal';
import {
  BarcodeButton,
  DeleteButton,
  PostButton,
  TagButton,
} from '@/components/Button';
import SelectForm from '@/components/SelectForm';
import TextForm from '@/components/TextForm';
import TextFormArea from '@/components/TextFormArea';
import useS3 from '@/hooks/s3/useS3';

// レシピの型（GET用）
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
  tags: Tag[]; // タグ情報を含むプロパティ
};
type Tag = {
  id?: number;
  name: string;
  _destroy?: boolean;
};

// レシピ投稿時に送信するデータの型（put用）
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

type User = {
  id: number;
};

const EditRecipe = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [calorie, setCalorie] = useState('');
  const [image, setImage] = useState<File | null>(null); // 画像を保持するためのstate
  const [preview, setPreview] = useState<string | null>(null); // プレビュー画像を保持するためのstate
  const [defaultImage, setDefaultImage] = useState<string | null>(null); // デフォルトの画像を保持するためのstate(画像を選択後、保存せずに戻った場合にデフォルト画像に戻るようにするため)
  const [barcode, setBarcode] = useState<string>(''); //バーコードの値を保持するためのstate
  const [tempTag, setTempTag] = useState<string>(''); //フロントで一時的にタグを保持するためのstate
  const [tags, setTags] = useState<Tag[]>([]); //送信するためのタグ配列を保持するためのstate

  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false); //バーコードモーダルの開閉を管理するためのstate
  const imageForm = useRef<HTMLInputElement>(null);

  // S3のカスタムフック(S3への画像アップロード処理をまとめたもの)
  const { uploadImageToS3, deleteImageFromS3 } = useS3();

  // 以下のコードはレシピの詳細ページを表示するためのコード。useRouterを使って、URLのパラメーターからIDを取得し、そのIDを使って、axiosを使って、レシピの詳細を取得する。
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User>();

  // ページ開いたらレシピの取得をする処理
  const getRecipe = useCallback(async () => {
    const response = await axios.get<Recipe>('/recipes/' + id);
    setRecipe(response.data);
    console.log('レシピの取得に成功しました', response.data);
  }, [id]);
  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  // ログイン中のユーザー情報の取得（ログインユーザのみ編集ボタンを表示させたいため、取得する必要がある）
  const getCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get<User>('/me');
      setCurrentUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('ユーザーの取得に失敗しました', error);
    }
  }, []);
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

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
      setTags(recipe.tags ? recipe.tags : []);
    }
  }, [recipe]);

  // レシピを削除する関数
  const deleteRecipe = async () => {
    // 画像が存在する場合は、S3から削除する
    if (recipe?.image) {
      await deleteImageFromS3(recipe.image);
      const response = await axios.delete('/recipes/' + id);
      alert('レシピを削除しました');
      await router.push('/myrecipe');
      console.log('レシピの削除に成功しました', response.data);
    }
  };

  // レシピを更新する関数
  const editPostRecipe = async () => {
    // 画像が存在する場合は、S3にアップロードし、そのURLを取得する
    const uploadedImage = image ? await uploadImageToS3(image) : null;
    const imageUrl = uploadedImage ? uploadedImage : defaultImage;
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

    const response = await axios.put('/recipes/' + id, data);
    console.log('レシピの更新に成功しました', response.data);
    alert('レシピを更新しました');
    await router.push('/myrecipe');
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

  // 未入力の必須項目がある場合のエラー表示を行う関数
  const getErrorMessage = () => {
    const errorMessages = [];
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
    if (tempTag && tags.filter((tag) => !tag._destroy).length <= 5) {
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
    console.log(
      '最新のタグ配列',
      tags.filter((tag) => !tag._destroy)
    );
  }, [tags]);

  useEffect(() => {
    console.log('テンプ', tempTag);
  }, [tempTag]);

  if (currentUser && recipe && recipe.user_id === currentUser.id) {
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
          <div className="text-center text-2xl text-[#68B68D]">レシピ編集</div>
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
            <img
              className="mx-auto mt-4 h-52 w-72 cursor-pointer rounded-2xl border-4 border-solid border-[#FBB87F] object-cover shadow-md hover:border-orange-500"
              onClick={() => {
                if (imageForm.current) {
                  imageForm.current.click();
                }
              }}
              src={preview}
              alt="プレビュー"
            />
          ) : (
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
            placeholder="※ 必須(20文字以内)"
            width="w-full"
            value={title}
            maxLength={20}
            onChange={(e) => {
              const newValue = e.target.value;
              const trimmedValue = newValue.trimStart();
              setTitle(trimmedValue);
            }}
          />
          <TextFormArea
            label="作り方"
            placeholder="※ 必須(500文字以内)"
            width="w-full"
            value={content}
            maxLength={500}
            onChange={(e) => {
              const newValue = e.target.value;
              const trimmedValue = newValue.trimStart();
              setContent(trimmedValue);
            }}
          />
          {/* タグの表示 */}
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
                  placeholder="※ 5個以内(15文字以内)"
                  width="w-full"
                  value={tempTag}
                  maxLength={15}
                  disabled={tags.filter((tag) => !tag._destroy).length >= 5}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const trimmedValue = newValue.trimStart();
                    setTempTag(trimmedValue);
                  }}
                />
              </form>
              <div className="ml-1 mr-4 mt-16">
                <TagButton
                  onClick={addTag}
                  disabled={tags.filter((tag) => !tag._destroy).length >= 5}
                >
                  <FontAwesomeIcon icon={faPlus} className="text-lg" />
                </TagButton>
              </div>
              <div className="mt-14">
                <BarcodeButton
                  onClick={() => {
                    setIsBarcodeModalOpen(!isBarcodeModalOpen);
                  }}
                  disabled={tags.filter((tag) => !tag._destroy).length >= 5}
                >
                  <FontAwesomeIcon icon={faBarcode} className="text-2xl" />
                </BarcodeButton>
              </div>
            </div>
            <div className="flex flex-wrap">
              {/* _destroyがtrueのもの以外の、tags配列の中身を表示 */}
              {tags.map((tag, index) => {
                if (!tag._destroy) {
                  return (
                    <div key={index} className="flex">
                      <div className="mr-3 mt-2 rounded-md bg-[#FDF1DE] px-1 py-0.5 shadow-md ">
                        # {tag.name}
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="ml-1 cursor-pointer text-[#FEABAE] transition duration-75 ease-in-out hover:scale-105 hover:text-[#F16B6E]"
                          // 以下のコードでは、クリックしたタグの_destroyをtrueにして、その後リクエストを送ることで、データベースからタグを削除する
                          onClick={() => {
                            const newTags = tags.map((t) => {
                              if (t == tag) {
                                t._destroy = true;
                              }
                              return t;
                            });
                            setTags(newTags);
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })}
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
              width="w-1/3"
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
              placeholder="未入力"
              width="w-1/3"
              value={price}
              type="number"
              min={0}
              max={9999}
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
              placeholder="未入力"
              width="w-1/3"
              value={calorie}
              type="number"
              min={0}
              max={9999}
              onChange={(e) => {
                if (e.target.value.length <= 4) {
                  setCalorie(e.target.value);
                }
              }}
            />
          </div>
          <div className="flex justify-end space-x-6">
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
            <div className="mt-12">
              <PostButton
                disabled={!title || !content}
                onClick={() => {
                  editPostRecipe();
                  console.log('クリック！！');
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </PostButton>
            </div>
          </div>
          <div>
            {getErrorMessage() ? (
              <div className="mt-3 text-end text-sm text-red-500">
                {getErrorMessage()}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>ログインしてください</div>;
  }
};

export default EditRecipe;
