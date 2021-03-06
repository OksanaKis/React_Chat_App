import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatNew from "./components/ChatNew";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
              <Route path="/rooms/:roomId" element={<ChatNew />} />
              <Route path="/" element={<ChatNew />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
