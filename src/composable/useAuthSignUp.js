import { ref } from 'vue'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

let useAuthSignUp = () => {
  let authError = ref(null);
  let createAccount = async (email, password) => {
    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Cannot Create Account!");
      }
      return res.user
    } catch(err) {
      authError.value = err.message; 
    }
  }
  return { authError, createAccount }
}

export default useAuthSignUp