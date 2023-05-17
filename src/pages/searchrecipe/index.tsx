import axios from 'axios';
import React, { useState } from 'react';
// import RcipeList from '@/components/RecipeList';
import { SearchButton } from '@/components/Button';
import RcipeList from '@/components/RecipeList';
import SearchForm from '@/components/SearchForm';

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
  const [searchWords, setSearchWords] = useState<string[]>([]); // 検索ワードを保持するstate
  const [resultRecipes, setResultRecipes] = useState<Recipe[]>([]); // 検索結果を保持するstate

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
    <div className="flex-col">
      <div className="flex items-center justify-center">
        <SearchForm
          placeholder="検索"
          witdh="w-1/2"
          label="検索"
          onChange={(e) => {
            const words = e.target.value.split(/\s+/); // 空白（半角・全角）で文字列を分割
            setSearchWords(words);
            console.log('分割した検索ワード', words);
          }}
        ></SearchForm>
        <SearchButton onClick={sendSearchRequest}>検索</SearchButton>
      </div>
      <div>
        <RcipeList recipes={resultRecipes} />
      </div>
    </div>
  );
};
export default SearchRecipe;
