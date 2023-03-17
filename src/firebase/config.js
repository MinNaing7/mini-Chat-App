
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDsCUVve5s2A3HU-Wvnqnv4VBxJ2RIVEpE",
  authDomain: "project-testing-a0b64.firebaseapp.com",
  projectId: "project-testing-a0b64",
  storageBucket: "project-testing-a0b64.appspot.com",
  messagingSenderId: "530100978197",
  appId: "1:530100978197:web:66c29fc5c45171ca84441c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore();

export { auth, storage, db }
