import { initializeApp } from 'firebase/app'  // Firebaseアプリの初期化を行うためのinitializeApp関数を'firebase/app'からインポート
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'  // Firebase Authenticationを使用するためのgetAuth関数を'firebase/auth'からインポート
import { useEffect, useState } from 'react'

const firebaseConfig = {  // Firebaseアプリの設定情報を変数に代入
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

const useAuth = () => {  // useAuthという名前の関数を定義する
  const app = initializeApp(firebaseConfig)  // Firebaseアプリの初期化
  const auth = getAuth(app)  // Firebase Authenticationの認証オブジェクトを取得
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // ローディング状態を追加

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false); // ローディング状態を更新
    });
  }, [auth]);

  return {auth, currentUser, loading}  // 認証オブジェクトを返す
}

export default useAuth  // useAuth関数をデフォルトエクスポートする
