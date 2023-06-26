import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBwbG7HM1G6Xh6_cZfw3L3K-aXawdK9_8I",
//   authDomain: "real-chat-9d376.firebaseapp.com",
//   projectId: "real-chat-9d376",
//   storageBucket: "real-chat-9d376.appspot.com",
//   messagingSenderId: "588511579755",
//   appId: "1:588511579755:web:9b66efc7e2c07c6122ab2e",
//   measurementId: "G-PY7293M11Z"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBO53R4g_dXsNJ29GaNXBQU3ec7Udgq6Gc",
  authDomain: "new-react-chat-app-831b4.firebaseapp.com",
  projectId: "new-react-chat-app-831b4",
  storageBucket: "new-react-chat-app-831b4.appspot.com",
  messagingSenderId: "25715960678",
  appId: "1:25715960678:web:100a6ad65a1e08923436a7",
  measurementId: "G-PNKNM9LNZ4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
