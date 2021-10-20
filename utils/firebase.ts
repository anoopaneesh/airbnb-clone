// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwQ4Q_l0NrvJ22WtWnKcavEO010xxWZww",
  authDomain: "airbnb-clone-6e718.firebaseapp.com",
  projectId: "airbnb-clone-6e718",
  storageBucket: "airbnb-clone-6e718.appspot.com",
  messagingSenderId: "374705217263",
  appId: "1:374705217263:web:8f743fe9f03657c495c51a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);     
export const auth =  getAuth(app)
export default app