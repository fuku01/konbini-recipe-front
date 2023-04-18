import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { PostButton } from '@/components/Button'
import TextForm from '@/components/TextForm'
import useAuth from '@/hooks/auth/useAuth'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useAuth()

  //ユーザー登録処理
  const registerUser = () => {
    // FirebaseのcreateUserWithEmailAndPasswordを使用して登録処理を実行
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // 登録成功時の処理
        const user = userCredential.user
        // ユーザー名を登録
        updateProfile(user, { displayName: name })
        console.log(user, 'ユーザー登録に成功しました。')
      })
      .catch((error) => {
        // 登録失敗時の処理
        console.error('ユーザー登録に失敗しました。', error)
      })
  }

  return (
    <div>
      <p className='text-center text-4xl mb-10'>ユーザー登録画面</p>
      <TextForm
        label='ユーザー名'
        placeholder='ユーザー名'
        witdh='w-full'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextForm
        label='メールアドレス'
        placeholder='メールアドレス'
        witdh='w-full'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextForm
        label='パスワード'
        placeholder='パスワード'
        witdh='w-full'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='text-right mt-5'>
        <PostButton onClick={registerUser}>登録</PostButton>
      </div>
    </div>
  )
}

export default Signup
