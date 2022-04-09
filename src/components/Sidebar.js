import React, { useEffect, useState } from "react";
import db from "../authentication/firebase";
import { Avatar } from "@material-ui/core";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../authentication/StateProvider";
import search from "../image/search.png";
import Logout from "../authentication/Logout";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState("");

  // console.log(rooms[0].data.lastActive)

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const filteredChatNames = rooms
    .filter((chatName) => {
      return chatName.data.name.toLowerCase().includes(value.toLowerCase());
    })
    .sort((a, b) => {
      return b.data.lastActive - a.data.lastActive;
    });

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL}></Avatar>
        <Logout />
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <img className="search" src={search} alt="" />
          <input
            type="text"
            placeholder="Search or start new chat"
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </div>
      <div className="sidebar_chats">
        <h2>Chats</h2>
        {filteredChatNames.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
