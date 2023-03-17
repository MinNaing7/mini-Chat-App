
import { ref } from "vue"
import { auth } from "../firebase/config"
import { onAuthStateChanged } from "firebase/auth";

let getCurrentUser = () => {
  let currentUser = ref(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
  });
  return { currentUser }
}

export default getCurrentUser