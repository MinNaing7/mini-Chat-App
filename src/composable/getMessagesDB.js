import { ref } from "vue"
import { db } from '../firebase/config'
import { collection, orderBy, 
  query, onSnapshot } from 'firebase/firestore'

let getMessagesDB = () => {
  let messagesError = ref('');
  let getMessages = () => {

    try {
      let messages = ref([]);
      let colRef = collection(db, 'messages');
      let q = query(colRef, orderBy('created_at'));
      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.docs.forEach( (doc) => {
          let document = { ...doc.data(), id: doc.id }
          results.push(document);
        });
        messages.value = results;
      });
      return messages
    } catch(err) {
      messagesError.value = err.message;
    }
  }
  return { messagesError, getMessages }
}

export default getMessagesDB