import { atom } from 'recoil';

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

// 検索ワードの状態を管理する
export const searchWordState = atom<string[]>({
  key: 'searchWordState',
  default: [], // 初期状態は空の配列
});

// 検索結果の状態を管理する
export const searchResultState = atom<Recipe[]>({
  key: 'searchResultState',
  default: [], // 初期状態は空の配列
});

// 検索タイプの状態を管理する
export const searchTypeState = atom<string>({
  key: 'searchTypeState',
  default: 'new', // 初期状態は新着検索
});
