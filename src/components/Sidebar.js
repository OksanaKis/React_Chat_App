import React, { useEffect, useState } from "react";
import db from "../authentication/firebase";
import { Avatar } from "@material-ui/core";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../authentication/StateProvider";
import geenTick from "../image/greentick.png";
import search from "../image/search.png";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();


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

  return (
    <div className="sidebar">
      <div className="sidebar_header">
      {/* <img className="greenTick" src={geenTick} alt="" /> */}
        <Avatar src={user?.photoURL}></Avatar>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <img className="search" src={search} alt="" />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <h2>Chats</h2>
        {/* <SidebarChat /> */}
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
