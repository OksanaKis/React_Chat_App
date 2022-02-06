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
  const [{ user }, dispatch] = useStateValue();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(true);

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

  const filteredChatNames = rooms.filter((chatName) => {
    return chatName.data.name.toLowerCase().includes(value.toLowerCase());
  });

  const itemClickHandler = (e) => {
    setValue(e.target.textContent);
    setIsOpen(!isOpen);
  };

  const inputClickHandler = () => {
    setIsOpen(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        {/* <img className="greenTick" src={geenTick} alt="" /> */}
        <Avatar src={user?.photoURL}></Avatar>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <img className="search" src={search} alt="" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onClick={inputClickHandler}
          />
          <ul className="searchInput">
            {value && isOpen
              ? filteredChatNames.map((person, index) => {
                  return (
                    <li
                      key={index}
                      className="searchInputItem"
                      onClick={itemClickHandler}
                    >
                      {person.data.name}
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
      <div className="sidebar_chats">
        <h2>Chats</h2>
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
