import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAzhN-SQp9wR7W9tcf3ybM0a-gGsYhPY44",
    authDomain: "chat-app-7c113.firebaseapp.com",
    projectId: "chat-app-7c113",
    storageBucket: "chat-app-7c113.appspot.com",
    messagingSenderId: "263079939697",
    appId: "1:263079939697:web:266999b1662fdb5b2655d0",
    measurementId: "G-5MBDC1BC48"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export { auth, provider};
  export default db;
  