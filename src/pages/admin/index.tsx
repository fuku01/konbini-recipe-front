import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '@/hooks/auth/useAuth';

// ログイン中のユーザを確認する用のページ

const Admin = () => {
  const { auth } = useAuth();

  const CurrentUser = () => {
    if (auth.currentUser !== null) {
      console.log(auth.currentUser);
    }
  };

  return (
    <div>
      {auth.currentUser ? (
        <div>
          <p className="mb-10 text-center text-4xl">管理画面</p>
          <div>
            <button
              onClick={() => {
                CurrentUser();
              }}
            >
              確認
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">ログインしていません。</p>
          <p>ログインして管理画面にアクセスしてください。</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
