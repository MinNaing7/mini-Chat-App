import { ref } from 'vue'
import { db } from '../firebase/config'
import { doc, getDoc ,onSnapshot } from 'firebase/firestore'

let getEachUserDB = () => {
  
  let userError = ref(null);
  let getUser = async (userID) => {
    try {
      let docRef = doc(db, 'users', userID);
      let docData = await getDoc(docRef);
      if (!docData) {
        throw new Error("Cannot Get User-Data");
      }
      let userProfile = { ...docData.data(), id: docData.id };
      return userProfile

      // let userProfile = ref({});
      // let docRef = doc(db, 'users', userID);
      // onSnapshot(docRef, (doc) => {
        // userProfile.value = { ...doc.data(), id: doc.id }
      // });
      // return userProfile
      
    } catch(err) {
      userError.value = err.message;
    }
  }
  return { userError, getUser }
}

export default getEachUserDB;