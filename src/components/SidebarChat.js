import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./SidebarChat.css";
import avatarJosefina from "../image/avatar.png";
import avatarVelaz from "../image/avatar1.png";
import avatarAlice from "../image/avatar2.png";
import avatarBarrera from "../image/avatar3.png";
import geenTick from "../image/greentick.png";


function SidebarChat({id, name}) {
  const [seeds, setSeeds] = useState([avatarJosefina, avatarVelaz, avatarAlice, avatarBarrera]);
  const [seed, setSeed] = useState();

  // useEffect(() => {
  //   // setSeed(Math.floor(Math.random() * 5000));
  //   seeds.map((image, index) => {
  //     if() {
  //       setSeed(image);
  //     }
  //   })
  // }, []);

  return (
    <Link to={`/rooms/${id}`} key={id}>
      <div className="sidebarChat">
      {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
      <Avatar />
      <img className="greenTick" src={geenTick} alt="" />
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
