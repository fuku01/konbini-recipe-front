import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { PostButton } from '@/components/Button';
import TextForm from '@/components/TextForm';
import useAuth from '@/hooks/auth/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useAuth();

  const loginUser = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // IDトークンを取得
    const idToken = await userCredential.user.getIdToken();
  };

  return (
    <div>
      <p className="mb-10 text-center text-4xl">ログイン画面</p>
      <TextForm
        label="メールアドレス"
        placeholder="メールアドレス"
        witdh="w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextForm
        label="パスワード"
        placeholder="パスワード"
        witdh="w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-5 text-right">
        <PostButton onClick={loginUser}>
          <FontAwesomeIcon icon={faUserPlus} />
        </PostButton>
      </div>
    </div>
  );
};

export default Login;
