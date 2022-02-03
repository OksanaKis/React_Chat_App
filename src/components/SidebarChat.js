import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./SidebarChat.css";

function SidebarChat({id, name}) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/rooms/${id}`} key={id}>
      <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>
      <div className="sidebarChatDate">
        Date
      </div>
    </div>
    </Link>
  );
}

export default SidebarChat;
