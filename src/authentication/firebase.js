import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwbG7HM1G6Xh6_cZfw3L3K-aXawdK9_8I",
  authDomain: "real-chat-9d376.firebaseapp.com",
  projectId: "real-chat-9d376",
  storageBucket: "real-chat-9d376.appspot.com",
  messagingSenderId: "588511579755",
  appId: "1:588511579755:web:9b66efc7e2c07c6122ab2e",
  measurementId: "G-PY7293M11Z"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
