import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import TextForm from '@/components/TextForm';
import useAuth from '@/hooks/auth/useAuth';

type User = {
  id: number;
  name: string;
};

const EditUser = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // ログイン中のユーザー情報を格納するステート
  const [editName, setEditName] = useState('');
  const { loginUser } = useAuth();
  const { token } = useAuth();

  // ログイン中のユーザー情報の取得（ログインユーザのみ編集ボタンを表示させたいため、取得する必要がある）
  const getCurrentUser = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get<User>('/me');
      setCurrentUser(response.data);
    } catch (error) {
      console.log('ユーザーの取得に失敗しました', error);
    }
  }, [token]);

  // ユーザー情報の更新
  const updateUser = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.put<User>('/edit_me', {
        name: editName,
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.log('ユーザー情報の更新に失敗しました', error);
    }
  }, [editName, token]);

  // データベースからユーザー情報を取得
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // FireBaseからメールアドレスを取得
  useEffect(() => {
    if (loginUser !== null) {
      setEmail(loginUser.email);
    }
  }, [loginUser]);

  return (
    <div className="select-none">
      {loginUser && (
        <div>
          <div className="mx-6 mt-6 rounded-2xl bg-[#FDF1DE] pb-8 pl-4 pt-4  shadow-md">
            <p className="text-center font-bold">
              <FontAwesomeIcon icon={faUserGear} className="mr-2" />
              ユーザー情報
            </p>
            <div className="mt-6 space-y-1 text-sm">
              <p>
                ユーザー名 ：{' '}
                <span className="text-base font-semibold">
                  {currentUser?.name}
                </span>
              </p>
              <p>
                メールアドレス ：
                <span className="text-base font-semibold">{email}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-8">
            <div className="w-3/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateUser();
                }}
                className="w-full"
              >
                <TextForm
                  label="ユーザー名を変更する"
                  placeholder="※ 10文字以内"
                  width="w-full"
                  value={editName}
                  maxLength={10}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const trimmedValue = newValue.trimStart();
                    setEditName(trimmedValue);
                  }}
                />
              </form>
            </div>
            <div className="mt-20">
              <button
                className="rounded-md px-1 py-0.5 underline hover:bg-[#FDF1DE] hover:text-orange-500 hover:underline active:scale-105"
                onClick={() => {
                  updateUser();
                }}
              >
                変更
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
