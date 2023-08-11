import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyBO53R4g_dXsNJ29GaNXBQU3ec7Udgq6Gc",
//   authDomain: "new-react-chat-app-831b4.firebaseapp.com",
//   projectId: "new-react-chat-app-831b4",
//   storageBucket: "new-react-chat-app-831b4.appspot.com",
//   messagingSenderId: "25715960678",
//   appId: "1:25715960678:web:100a6ad65a1e08923436a7",
//   measurementId: "G-PNKNM9LNZ4",
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgOnUb3S2Z-narw0sT125gDrNwcZbvsRY",
  authDomain: "chat-app-96d95.firebaseapp.com",
  projectId: "chat-app-96d95",
  storageBucket: "chat-app-96d95.appspot.com",
  messagingSenderId: "766715976100",
  appId: "1:766715976100:web:cee6bf01682d5bb20dc931",
  measurementId: "G-HVKNHX7ED3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
