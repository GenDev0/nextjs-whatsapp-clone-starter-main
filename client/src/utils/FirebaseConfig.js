// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCovBIyW2al2SNvCFoeW7NbQQL80PzthEA",
  authDomain: "whatsapp-clone-7296e.firebaseapp.com",
  projectId: "whatsapp-clone-7296e",
  storageBucket: "whatsapp-clone-7296e.appspot.com",
  messagingSenderId: "434365767978",
  appId: "1:434365767978:web:f74eac3ca50075f4bbbe53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
