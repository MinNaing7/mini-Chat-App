import { ref, toHandlerKey } from 'vue'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

let useAuthSignIn = () => {
  let signInError = ref(null);
  let signInAccount = async (email, password) => {
    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      if (!res) {
        throw new Error("Cannot Login Account!");
      }
      return res.user
    } catch(err) {
      signInError.value = err.message;
    }
  }
  return { signInError, signInAccount}
}

export default useAuthSignIn