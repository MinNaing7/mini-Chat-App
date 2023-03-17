import { ref } from 'vue'
import { db } from '../firebase/config'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

let useProfileInfoDB = () => {

  let dbError = ref(null);
  let uploadUserProfile = async (displayName, email, photoURL, uid) => {

    try {
      // User-Profile Object
      let userProfile = {
        name: displayName,
        email: email,
        photo: photoURL,
        last_active: serverTimestamp()
      }
      // Upload to FireStore
      let docRef = doc(db, 'users', uid);
      await setDoc(docRef, userProfile);

    } catch(err) {
      dbError.value = err.message;
    }
  }
  return { dbError, uploadUserProfile }
}

export default useProfileInfoDB