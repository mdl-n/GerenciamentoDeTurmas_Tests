
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAa55UvDiSZY9ri5CaCHoJb3yudwSKwVKc",
  authDomain: "devtest-proj-escola.firebaseapp.com",
  projectId: "devtest-proj-escola",
  storageBucket: "devtest-proj-escola.appspot.com",
  messagingSenderId: "31744510715",
  appId: "1:31744510715:web:e939981fde74e71a807e5e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app);
export default database
