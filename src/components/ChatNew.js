import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import db from "../authentication/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getRandomJokes } from "../api/getRandomJoke";
import { useStateValue } from "../authentication/StateProvider";
import sendIcon from "../image/send4.png";
import geenTick from "../image/greentick.png";

function ChatNew() {
  const [input, setInput] = useState("");
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
    }
  }, [roomId]);

  const randomJoke = async () => {
    let chuckNorris = "Chuck Norris";
    const data = getRandomJokes();
    data
      .then((res) => {
        return res;
      })
      .then((response) => {
        setJoke(response.data.value);
      });
    await db.collection("rooms").doc(roomId).collection("messages").add({
      message: joke,
      name: chuckNorris,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    await db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setTimeout(async () => await randomJoke(), 10000);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <img className="greenTick" src={geenTick} alt="" />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__bodyMessage">
          {messages.map((message, index) => (
            <div className="chat__bodyMessage">
              <p
                key={index}
                className={`chat__message ${
                  message.name == user.displayName && "chat__receiver"
                }`}
              >
                {message.message}
                <span className="chat__timestemp">
                  {new Date(message.timestamp?.toDate()).toLocaleString(
                    "en-US"
                  )}
                </span>
              </p>
            </div>
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
            <img className="sendIcon" src={sendIcon} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatNew;
