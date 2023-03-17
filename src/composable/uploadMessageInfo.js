import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

let uploadMessageIno = () => {

  let msgError = ref(null);
  let uploadMsg = async (message, sender, receiver, name, photo, image) => {

    try {
      // Message-Info Object
      let messageInfo = {
        message: message,
        image: image,
        from: sender,
        to: receiver,
        chater_name: name,
        chater_photo: photo,
        chat_between: [sender, receiver],
        created_at: serverTimestamp()
      }
      // Upload to FireStore
      let colRef = collection(db, 'messages');
      await addDoc(colRef, messageInfo);

    } catch(err) {
      msgError.value = err.message;
    }
  }
  return { msgError , uploadMsg }
}

export default uploadMessageIno