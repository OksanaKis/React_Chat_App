import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
import db from "../authentication/firebase";
import greenTick from "../image/greentick.png";

function SidebarChat({ id, name }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  return (
    <Link to={`/rooms/${id}`} key={id}>
      <div className="sidebarChat">
        <Avatar />
        <img className="greenTick" src={greenTick} alt="" />
        <div className="sidebarChat__info">
          <h2 className="sidebarChat__names">{name}</h2>
          <p>{messages[0]?.message.slice(0, 25) + "..."}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
