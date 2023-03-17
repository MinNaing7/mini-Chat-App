
import { ref } from "vue"
import { db } from '../firebase/config'
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

let getAllUsersDB = () => {

  let usersError = ref(null);
  let getUsers = (currentUser) => {
    try {
      let users = ref([]);
      let colRef = collection(db, 'users');
      let q = query(colRef, orderBy('last_active','desc'));
      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          let document = { ...doc.data(), id: doc.id }
          results.push(document);
        });
        // To Remove Current User in Chat-List
        let filteredResults = results.filter(result => {
          return result.email !== currentUser.email
        });
        users.value = filteredResults;
      });
      return users

    } catch(err) {
      usersError.value = err.message;
    }
  }
  return { usersError, getUsers }
}

export default getAllUsersDB