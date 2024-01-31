import React, { useEffect } from "react";
import "./App.css";
import Webcam from "./components/WebcamCapture";
import Chat from "./components/Chats";
import { Routes, Route } from "react-router-dom";
import Preview from "./components/Preview";
import View from "./components/View";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { login, logout, selectUser } from "./features/appSlice";
import useAuth from "./components/useAuth";

function App() {
  const user = useSelector(selectUser);

  useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-400">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/home" element={<Webcam />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/chat/view" element={<View />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
