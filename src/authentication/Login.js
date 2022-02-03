import React, { useState } from "react";
import "../App.css";
import "../authentication/Login.css";
import chatImage from "../image/chat.png";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src={chatImage} alt="" />
        <div className="login__text">
          <h2>Sign in to ChatApp</h2>
        </div>
        <button onClick={signIn}>Sign In With Google</button>
      </div>
    </div>
  );
}

export default Login;
