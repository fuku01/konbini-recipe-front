import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '@/hooks/auth/useAuth';

const Admin = () => {
  //   const [displayname, setDisplayname] = useState<string | null>('');
  //   const [email, setEmail] = useState('');
  const { auth } = useAuth();

  const CurrentUser = () => {
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      //   setDisplayname(user.displayName);
      console.log(user);
      // const email = user.email;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      //   const uid = user.uid;
    }
  };

  return (
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
  );
};

export default Admin;
