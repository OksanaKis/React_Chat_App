import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import db from "../authentication/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getRandomJokes } from "../api/getRandomJoke";
import { useStateValue } from "../authentication/StateProvider";

function ChatNew() {
  const [input, setInput] = useState("");
  //   const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [joke, setJoke] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

//   useEffect(() => {
//     setTimeout(randomJoke(), 10000);
//   }, [roomId]);

  function randomJoke() {
    let chuckNorris = "Chuck Norris";
    const data = getRandomJokes();
    data
      .then((res) => {
        return res;
      })
      .then((response) => {
        setJoke(response.data.value);
        console.log(response);
      });
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: joke,
      name: chuckNorris,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setTimeout(randomJoke(), 10000);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
      </div>
      <div className="chat__body">
      <div className="chat__bodyMessage">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${
              message.name == user.displayName && "chat__receiver"
            }`}
          >
            {/* <span className="chat_name">{message.name}</span> */}
            {message.message}
            <span className="chat__timestemp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      </div>
      <div className="chat__footer">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            {" "}
            Send a Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatNew;
