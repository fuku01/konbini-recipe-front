import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signInWithEmailAndPassword } from 'firebase/auth';
import router from 'next/router';
import React, { useState } from 'react';
import { PostBlueButton } from '@/components/Button';
import TextForm from '@/components/TextForm';
import useAuth from '@/hooks/auth/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useAuth();

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('ログインしました');
      await router.push('/home');
    } catch (error) {
      alert('ログインに失敗しました');
      await router.push('/login');
    }
  };

  return (
    <div>
      <div className="text-center text-[#61B3DF]">
        <FontAwesomeIcon icon={faRightToBracket} className="text-6xl" />
        <div className="ml-1 mt-2 text-2xl">ログイン</div>
      </div>
      <TextForm
        label="メールアドレス"
        placeholder="メールアドレス"
        type="email"
        witdh="w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextForm
        label="パスワード"
        placeholder="パスワード"
        type="password"
        witdh="w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="mt-5 text-right">
        <PostBlueButton onClick={loginUser}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </PostBlueButton>
      </div>
    </div>
  );
};

export default Login;
