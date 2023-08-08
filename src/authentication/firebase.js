import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBO53R4g_dXsNJ29GaNXBQU3ec7Udgq6Gc",
  authDomain: "new-react-chat-app-831b4.firebaseapp.com",
  projectId: "new-react-chat-app-831b4",
  storageBucket: "new-react-chat-app-831b4.appspot.com",
  messagingSenderId: "25715960678",
  appId: "1:25715960678:web:100a6ad65a1e08923436a7",
  measurementId: "G-PNKNM9LNZ4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
