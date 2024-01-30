import React from "react";
import "./App.css";
import Webcam from "./components/WebcamCapture";
import Chat from "./components/Chats";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Preview from "./components/Preview";
import View from "./components/View";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-400">
      {location.pathname !== "/" && (
        <div className="absolute top-0 right-0 m-4">
          <Logout />
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Webcam />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/chat/view" element={<View />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
