import { ref } from 'vue'
import { storage } from '../firebase/config'
import { ref as stRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

let useImgStorage = () => {

  let storageError = ref(null);
  let uploadUserImg = async (folderName, profileImg) => {

    try {
      let storageRef = stRef(storage, `/${folderName}/${profileImg.name}`);
      let uploadTask = uploadBytesResumable(storageRef, profileImg);
      await uploadTask;
      let imageURL = await getDownloadURL(uploadTask.snapshot.ref);
      return imageURL;

    } catch(err) {
      storageError.value = err.message;
    }
  }
  return { storageError, uploadUserImg }
}

export default useImgStorage