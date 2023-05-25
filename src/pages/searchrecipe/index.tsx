import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import BarcodeModal from '@/components/BarcodeModal';
import { BarcodeButton } from '@/components/Button';
import RecipeList from '@/components/RecipeList';
import SearchForm from '@/components/SearchForm';
import { Pagy, searchPagyState } from '@/state/pagy';
import {
  searchResultState,
  searchTypeState,
  searchWordState,
} from '@/state/search';

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  time: number;
  calorie: number;
  image: string;
  created_at: Date;
  updated_at: Date;
  price: number;
  favorites_count: number;
};
type RecipeResponse = {
  recipes: Recipe[]; // レシピの配列
  pagy: Pagy; // ページネーション情報
};

const SearchRecipe = () => {
  const [searchWords, setSearchWords] = useRecoilState(searchWordState); //検索ワードを他ページ遷移後も保持する「Recoil」のstate
  const [resultRecipes, setResultRecipes] = useRecoilState(searchResultState); //検索結果を他ページ遷移後も保持する「Recoil」のstate
  const timerId = useRef<NodeJS.Timeout | null>(null); // useRefを使ってタイマーIDを管理する。stateにすると再レンダリングされてしまうため、useRefを使う
  const [searchType] = useRecoilState(searchTypeState); // 検索の種類をボタンを管理するステート。デフォルトは新着順。

  const [pagy, setPagy] = useRecoilState(searchPagyState); // ページネーション情報を管理するステート(ページを維持するため)

  const [barcode, setBarcode] = useState<string>('');
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  // 検索リクエストを送信する関数
  const sendSearchRequest = useCallback(
    async (page: number | null) => {
      if (searchType === 'new') {
        try {
          const response = await axios.get<RecipeResponse>(
            `/search_recipes?page=${page}`,
            {
              params: { searchWords },
            }
          );
          setResultRecipes(response.data.recipes);
          console.log('【新着順】の検索結果を取得しました', response.data);
          console.log('現在のページ', page);
          setPagy(response.data.pagy); // ページネーション情報を更新する(ページを維持するため)
        } catch (error) {
          console.log('【新着順】の検索結果を取得できませんでした', error);
        }
      } else if (searchType === 'rank') {
        try {
          const response = await axios.get<RecipeResponse>(
            `/search_recipes_by_favorite?page=${page}`,
            {
              params: { searchWords },
            }
          );
          setResultRecipes(response.data.recipes);
          console.log('【人気順】の検索結果を取得しました', response.data);
          console.log('現在のページ', page);
          setPagy(response.data.pagy); // ページネーション情報を更新する(ページを維持するため)
        } catch (error) {
          console.log('【人気順】の検索結果を取得できませんでした', error);
        }
      }
    },
    [searchType, searchWords, setResultRecipes, setPagy]
  ); // searchTypeを依存関係に追加。

  // 検索ワードが変更されたら検索リクエストを送信するuseEffect
  useEffect(() => {
    // -------------検索ワードが空でない場合-----------------
    if (searchWords && searchWords[0] !== '') {
      // 既にタイマーがセットされている場合は、タイマーをクリアする
      if (timerId.current !== null) {
        clearTimeout(timerId.current); // ※タイマーをクリアする理由は、連続で入力された場合に、前回のタイマーをクリアするため
      }
      // timerId.currentに、setTimeoutの返り値を代入することで、タイマーIDを管理できる
      // 0.5秒後に、sendSearchRequest()を実行する
      timerId.current = setTimeout(() => {
        sendSearchRequest(pagy.page); // 検索リクエストを送信する関数
      }, 500);
    }
    // ---------------検索ワードが空の場合-------------------
    else {
      setResultRecipes([]); // 検索結果を空にする
      // 既にタイマーがセットされている場合は、タイマーをクリアする
      if (timerId.current !== null) {
        clearTimeout(timerId.current); // ※タイマーをクリアする理由は、連続で入力された場合に、前回のタイマーをクリアするため
      }
    }
  }, [pagy.page, searchWords, sendSearchRequest, setResultRecipes]);

  // バーコードに値が入ったら、searchWordsにその値を追加する関数
  useEffect(() => {
    if (barcode) {
      setSearchWords([barcode]);
      setBarcode('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcode]);

  return (
    <div>
      {isBarcodeModalOpen && (
        <BarcodeModal
          isBarcodeModalOpen={isBarcodeModalOpen}
          setIsBarcodeModalOpen={setIsBarcodeModalOpen}
          setBarcode={setBarcode}
        />
      )}
      <div className="flex items-center">
        <SearchForm
          placeholder="キーワードから探す"
          width="w-full"
          label="検索"
          value={searchWords.join(' ')}
          onChange={(e) => {
            const trimmedValue = e.target.value.trimStart(); // 入力値の先頭の空白を除去
            const words = trimmedValue.split(/\s+/); // 空白（半角・全角）で文字列を分割
            setSearchWords(words); // 検索ワードをstateにセット
            console.log('分割した検索ワード', words);
          }}
        />
        <div className="ml-4">
          <BarcodeButton
            onClick={() => {
              setIsBarcodeModalOpen(!isBarcodeModalOpen);
            }}
          >
            <FontAwesomeIcon icon={faBarcode} className="text-2xl" />
          </BarcodeButton>
        </div>
      </div>
      <div>
        <RecipeList recipes={resultRecipes} />
        {resultRecipes && resultRecipes.length > 0 ? (
          <div className="mt-5 text-center font-semibold">
            <button
              className="cursor-pointer rounded-md px-1 py-0.5 font-semibold hover:bg-[#FDF1DE] hover:text-orange-500 hover:underline"
              disabled={pagy.prev === null}
              onClick={() => {
                sendSearchRequest(pagy.prev ?? 1); // ページネーション情報のprevを引数に渡してマイレシピを取得する、prevがnullの場合は1を渡す
              }}
            >
              前のページ
            </button>
            <span className="mx-5">
              {pagy.page} / {pagy.last}
            </span>
            <button
              className="cursor-pointer rounded-md px-1 py-0.5 font-semibold hover:bg-[#FDF1DE] hover:text-orange-500 hover:underline"
              disabled={pagy.next === null}
              onClick={() => {
                sendSearchRequest(pagy.next ?? pagy.last); // ページネーション情報のnextを引数に渡してマイレシピを取得する、nextがnullの場合はlastを渡す
              }}
            >
              次のページ
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default SearchRecipe;
