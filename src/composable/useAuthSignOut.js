
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

let useAuthSignOut = () => {
  let signOutError = ref(null);
  let signOutAccout = async () => {
    try {
      await signOut(auth);
    } catch(err) {
      signOutError.value = err.message;
    }
  }
  return { signOutError, signOutAccout }
}

export default useAuthSignOut