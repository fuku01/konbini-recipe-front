import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import router from 'next/router';
import React, { useState } from 'react';
import { PostButton } from '@/components/Button';
import TextForm from '@/components/TextForm';
import useAuth from '@/hooks/auth/useAuth';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useAuth();

  //ユーザー登録処理
  const signupUser = async () => {
    // FirebaseのcreateUserWithEmailAndPasswordを使用して登録処理を実行
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // ユーザー名を登録
      await updateProfile(userCredential.user, { displayName: name });
      // IDトークンを取得
      const idToken = await userCredential.user.getIdToken();
      // ユーザー情報をDBに登録
      await axios.post('/users', {
        id_token: idToken, // IDトークンを送信
      });
      alert('ユーザーを登録しました');
      await router.push('/home');
    } catch (error) {
      console.log('ユーザー登録に失敗しました', error);
      alert('ユーザー登録に失敗しました');
      await router.push('/signup');
    }
  };

  return (
    <div>
      <div className="text-center text-[#68B68D]">
        <FontAwesomeIcon icon={faUserPlus} className="text-6xl" />
        <div className="mr-4 mt-2 text-2xl">新規登録</div>
      </div>
      <TextForm
        label="ユーザー名"
        placeholder="ユーザー名"
        width="w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextForm
        label="メールアドレス"
        placeholder="メールアドレス"
        type="email"
        width="w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextForm
        label="パスワード"
        placeholder="パスワード"
        type="password"
        width="w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-5 text-right">
        <PostButton onClick={signupUser}>
          <FontAwesomeIcon icon={faUserPlus} />
        </PostButton>
      </div>
    </div>
  );
};

export default Signup;
