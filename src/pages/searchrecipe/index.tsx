import React, { useState } from 'react';
// import RcipeList from '@/components/RecipeList';
import { SearchButton } from '@/components/Button';
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

  return (
    <div>
      <div className="">
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
      </div>
      <SearchButton>検索</SearchButton>
      {/* <RcipeList recipes={favorite} /> */}
    </div>
  );
};
export default SearchRecipe;
