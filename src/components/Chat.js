import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import "./Chat.css";
import { Avatar } from "@material-ui/core";
import db from "../authentication/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getRandomJokes } from "../api/getRandomJoke";
import { useStateValue } from "../authentication/StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const {roomId} = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chuckJokes, setChuckJokes] = useState([]);
  const [joke, setJoke] = useState("");
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
        setRoomName(snapshot.data().name);
      });
      db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => doc.data()))
    });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    db.collection('rooms').doc(roomId).collection("jokes").orderBy("timestamp","asc").onSnapshot(snapshot => {
      setChuckJokes(snapshot.docs.map(doc => doc.data()))
  });
  }, [joke]);


  function randomJoke() {
const data = getRandomJokes();
    data
      .then((res) => {
        return res;
      })
      .then((response) => {
        setJoke(response.data.value);
        // console.log(response.data.value);
      });
      db.collection('rooms').doc(roomId).collection('jokes').add({
        message: joke,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }


    
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setInput()
    setInput("");
    setTimeout(randomJoke(), 10000);
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__bodyMessage">
          <Avatar />
          <div className={`chat__message ${true && 'chat__receiver'}`}>
          {chuckJokes.map((chuckJoke, index) => (
            <p key={index}>{chuckJoke.message}</p>
          ))}
          </div>
          <div className="chat__timestamp">
          <span>4:34 PM</span>
          </div>
        </div>
        <div className="chat__bodyReceiver">
          {messages.map((message, index) => (
                    <p key={index} className={`chat_message ${ message.name == user.displayName && 'chat_receiver'}`}>
                        {message.message}
                        <span className="chat_timestemp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
        </div>
      </div>
      <div className="chat__footer">
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type your message"/>
          <button type="submit" onClick={sendMessage}>Send a message</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
