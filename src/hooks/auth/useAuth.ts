// import axios from 'axios';
import axios from 'axios';
import { initializeApp } from 'firebase/app'; // Firebaseアプリの初期化を行うためのinitializeApp関数を'firebase/app'からインポート
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'; // Firebase Authenticationを使用するためのgetAuth関数を'firebase/auth'からインポート
import { useEffect, useState } from 'react';

const firebaseConfig = {
  // Firebaseアプリの設定情報を変数に代入
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const useAuth = () => {
  // useAuthという名前の関数を定義する
  const app = initializeApp(firebaseConfig); // Firebaseアプリの初期化
  const auth = getAuth(app); // Firebase Authenticationの認証オブジェクトを取得
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // トークンを保持するための変数を定義し、初期値をnullに設定
  const [isWaiting, setIsWaiting] = useState<boolean>(false); // ログイン状態の変化を監視するための変数を定義し、初期値をtrueに設定

  // ログイン状態の変化を監視する（初期描画のタイミングで、ログイン状態をセットする）
  // ※ログインのセットより初期描画の方が早いため、これをしないと、初期描画時にログイン状態がセットされず、初期描画時にログインが必要なページを表示できない。
  useEffect(() => {
    setIsWaiting(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser(user);
      }
      setIsWaiting(false);
    });
  }, [auth]);

  useEffect(() => {
    if (loginUser) {
      loginUser.getIdToken(true).then((idToken) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        setToken(idToken);
      });
    }
  }, [loginUser]);

  return { auth, loginUser, token, isWaiting }; // 認証オブジェクトを返す
};

export default useAuth;
