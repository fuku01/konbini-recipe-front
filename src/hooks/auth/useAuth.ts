import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const useAuth = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyByqxWEw-2JEqFypPU9dx9rZdZHuk4Pwic',
    authDomain: 'konbini-recipe.firebaseapp.com',
    projectId: 'konbini-recipe',
    storageBucket: 'konbini-recipe.appspot.com',
    messagingSenderId: '161237504907',
    appId: '1:161237504907:web:aa9c6d3abd16d34674158e',
    measurementId: 'G-3GHZEN3HYV',
  }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  return auth
}

export default useAuth
