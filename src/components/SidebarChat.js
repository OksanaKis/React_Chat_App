import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./SidebarChat.css";
import db from "../authentication/firebase";
import avatarJosefina from "../image/avatar.png";
import avatarVelaz from "../image/avatar1.png";
import avatarAlice from "../image/avatar2.png";
import avatarBarrera from "../image/avatar3.png";
import geenTick from "../image/greentick.png";



function SidebarChat({id, name}) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
  if (id) {
    db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
      setMessages(snapshot.docs.map((doc) => doc.data()))
    ))
  }
  }, [id]);

  return (
    <Link to={`/rooms/${id}`} key={id}>
      <div className="sidebarChat">
      <Avatar />
      <img className="greenTick" src={geenTick} alt="" />
      <div className="sidebarChat__info">
        <h2 className="sidebarChat__names">{name}<span className="sidebar__timestemp">
          {/* {new Date(messages[0]?.timestamp.toDate()).toString().substring(4,16)} */}
        </span></h2>
        <p>{messages[0]?.message.slice(0, 25)+'...'}
        </p>
      </div>
    </div>
    </Link>
  );
}

export default SidebarChat;
