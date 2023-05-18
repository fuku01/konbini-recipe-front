import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { BarcodeButton } from '@/components/Button';
import RecipeList from '@/components/RecipeList';
import SearchForm from '@/components/SearchForm';
import { searchResultState, searchWordState } from '@/state/search';

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

const SearchRecipe = () => {
  const [searchWords, setSearchWords] = useRecoilState(searchWordState); //検索ワードを他ページ遷移後も保持する「Recoil」のstate
  const [resultRecipes, setResultRecipes] = useRecoilState(searchResultState); //検索結果を他ページ遷移後も保持する「Recoil」のstate
  const timerId = useRef<NodeJS.Timeout | null>(null); // useRefを使ってタイマーIDを管理する。stateにすると再レンダリングされてしまうため、useRefを使う

  // 検索リクエストを送信する関数
  const sendSearchRequest = useCallback(async () => {
    try {
      const response = await axios.get<Recipe[]>('/search_recipes', {
        params: { searchWords },
      });
      setResultRecipes(response.data);
      console.log('検索結果を取得しました', response.data);
    } catch (error) {
      console.log('検索結果を取得できませんでした', error);
    }
  }, [searchWords, setResultRecipes]);

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
        sendSearchRequest(); // 検索リクエストを送信する関数
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
  }, [searchWords, sendSearchRequest, setResultRecipes]);

  return (
    <div>
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
          <BarcodeButton>
            <FontAwesomeIcon icon={faBarcode} className="text-2xl" />
          </BarcodeButton>
        </div>
      </div>
      <div className="mt-6">
        <RecipeList recipes={resultRecipes} />
      </div>
    </div>
  );
};
export default SearchRecipe;
