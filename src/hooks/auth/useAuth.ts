import { initializeApp } from 'firebase/app'  // Firebaseアプリの初期化を行うためのinitializeApp関数を'firebase/app'からインポート
import { getAuth } from 'firebase/auth'  // Firebase Authenticationを使用するためのgetAuth関数を'firebase/auth'からインポート
import { useState } from 'react'

const firebaseConfig = {  // Firebaseアプリの設定情報を変数に代入
  apiKey: 'AIzaSyByqxWEw-2JEqFypPU9dx9rZdZHuk4Pwic',
  authDomain: 'konbini-recipe.firebaseapp.com',
  projectId: 'konbini-recipe',
  storageBucket: 'konbini-recipe.appspot.com',
  messagingSenderId: '161237504907',
  appId: '1:161237504907:web:aa9c6d3abd16d34674158e',
  measurementId: 'G-3GHZEN3HYV',
}

const useAuth = () => {  // useAuthという名前の関数を定義
  const app = initializeApp(firebaseConfig)  // Firebaseアプリの初期化
  const auth = getAuth(app)  // Firebase Authenticationの認証オブジェクトを取得
  return {auth}  // 認証オブジェクトを返す
}

export default useAuth  // useAuth関数をデフォルトエクスポートする
