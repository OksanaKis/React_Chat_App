import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./authentication/Login";
import { useStateValue } from "../src/authentication/StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
        <Router>
            <Sidebar />
            <Routes>
                  <Route path="/rooms/:roomId" element={<Chat/>}/>
                  <Route path="/" element={<Chat/>}/>        
                </Routes>            
            </Router>
        </div>
      )}
    </div>
  );
}

export default App;
