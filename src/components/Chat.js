import React, { useEffect, useState } from "react";
import "./Chat.css";
import { Avatar } from "@material-ui/core";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log('e.target.value', input);
    setInput("");
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__bodyMessage">
          <Avatar />
          <div className={`chat__message ${true && 'chat__receiver'}`}>
          <p>Hello hello hello hello hello</p>
          </div>
          <div className="chat__timestamp">
          <span>4:34 PM</span>
          </div>
        </div>
        <div className="chat__bodyReceiver">
          <p className="chat__messageReceiver">Hi hi hi hi hi</p>
          {/* <div className="chat__timestampReceiver">
          <span>7:55 PM</span>
          </div> */}
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
