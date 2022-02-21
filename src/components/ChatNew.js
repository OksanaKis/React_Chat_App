import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import db from "../authentication/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getRandomJokes } from "../api/getRandomJoke";
import { useStateValue } from "../authentication/StateProvider";
import sendIcon from "../image/send4.png";
import greenTick from "../image/greentick.png";

function ChatNew() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [joke, setJoke] = useState("");
  const [{ user }] = useStateValue();
  let active = new Date().getTime();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms").doc(roomId).update({
        lastActive: active,
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

  useEffect(() => {
    let chuckNorris = "Chuck Norris";
    if (joke) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: joke,
        name: chuckNorris,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  }, [joke]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const randomJoke = async () => {
    const data = getRandomJokes();
    data
      .then((res) => {
        return res;
      })
      .then((response) => {
        setJoke(response.data.value);
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
        <img className="greenTick" src={greenTick} alt="" />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__bodyMessage">
          {messages.map((message, index) => (
            <div className="chat__bodyMessage" key={index}>
              <p
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
          <div ref={messagesEndRef} />
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
