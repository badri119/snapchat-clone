import React from "react";
import "./App.css";
import Webcam from "./components/WebcamCapture";
import Chat from "./components/Chats";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Preview from "./components/Preview";
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-300">
      <Routes>
        <Route exact path="/" element={<Webcam />}></Route>
        <Route path="/preview" element={<Preview />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
