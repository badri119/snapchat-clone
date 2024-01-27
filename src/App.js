import React from "react";
import "./App.css";
import Webcam from "./components/WebcamCapture";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Preview from "./components/Preview";
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-300">
      <Routes>
        <Route exact path="/" element={<Webcam />}></Route>
        <Route path="/preview" element={<Preview />}></Route>
      </Routes>
    </div>
  );
}

export default App;
