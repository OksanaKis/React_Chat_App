import React from "react";
import "../App.css";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

function Logout() {
  const [{}, dispatch] = useStateValue();

  const signOut = () => {
    auth
      .signOut(provider)
      .then(() => {
        dispatch({
          type: actionTypes.LOGOUT_USER,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <button className="logout" onClick={signOut}>
      Logout
    </button>
  );
}

export default Logout;
