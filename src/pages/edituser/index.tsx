import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import TextForm from '@/components/TextForm';
import useAuth from '@/hooks/auth/useAuth';

const EditUser = () => {
  const { loginUser } = useAuth();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  //  ログイン中のユーザ情報をステートに保存
  useEffect(() => {
    if (loginUser !== null) {
      console.log('ログインユーザー情報', loginUser);
      setEmail(loginUser.email);
    }
  }, [loginUser]); // loginUserを依存配列に追加

  // ユーザー情報の更新
  const updateUser = async () => {
    if (loginUser !== null) {
      try {
        await updateProfile(loginUser, {
          displayName: editName,
        });
        setDisplayName(editName); // ユーザ名が更新された後、ステートを更新
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {loginUser ? (
        <div>
          <div>
            <div className="text-center text-[#61B3DF]">
              <FontAwesomeIcon icon={faUserGear} className="text-6xl" />
              <div className="mr-1 mt-2 text-2xl">ユーザー設定</div>
            </div>
            <h1>ユーザー情報</h1>
            <div>名前：{displayName}</div>
            <div>メールアドレス：{email}</div>
          </div>
          <div>
            <TextForm
              label="ユーザー名"
              placeholder="ユーザー名"
              width="w-full"
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              updateUser();
            }}
          >
            更新
          </button>
        </div>
      ) : (
        <div>ログインしてください</div>
      )}
    </div>
  );
};

export default EditUser;
