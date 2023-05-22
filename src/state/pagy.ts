import { atom } from 'recoil';

// ページネーション情報の型
export type Pagy = {
  prev: number | null; // 前のページ
  next: number | null; // 次のページ
  page: number | null; // 現在のページ
  last: number | null; // 最後のページ
  count?: number | null; // レシピの総数
};

// マイレシピのページネーションの状態を管理する
export const myPagyState = atom<Pagy>({
  key: 'myPagyState',
  default: {
    prev: null,
    next: null,
    page: 1,
    last: null,
  },
});

// お気に入りのページネーションの状態を管理する
export const favoritePagyState = atom<Pagy>({
  key: 'favoritePagyState',
  default: {
    prev: null,
    next: null,
    page: 1,
    last: null,
  },
});

// 検索のページネーションの状態を管理する
export const searchPagyState = atom<Pagy>({
  key: 'searchPagyState',
  default: {
    prev: null,
    next: null,
    page: 1,
    last: null,
  },
});
