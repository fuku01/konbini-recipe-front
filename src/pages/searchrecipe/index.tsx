import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
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

  // 検索リクエストを送信する関数
  const sendSearchRequest = async () => {
    try {
      const response = await axios.get<Recipe[]>('/search_recipes', {
        params: { searchWords },
      });
      setResultRecipes(response.data);
      console.log('検索結果を取得しました', response.data);
    } catch (error) {
      console.log('検索結果を取得できませんでした', error);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // searchWordsが全て空でない場合のみ検索を実行
            if (!searchWords.every((word) => word === '')) {
              sendSearchRequest();
            }
          }}
          className="w-full"
        >
          <SearchForm
            placeholder="キーワードから探す"
            width="w-full"
            label="検索"
            value={searchWords.join(' ')}
            onChange={(e) => {
              const trimmedValue = e.target.value.trimStart(); // 入力値の先頭の空白を除去
              const words = trimmedValue.split(/\s+/); // 空白（半角・全角）で文字列を分割
              setSearchWords(words);
              console.log('分割した検索ワード', words);
            }}
          />
        </form>
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
