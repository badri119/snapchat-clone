import { ChatBubble, RadioButtonUnchecked, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";
const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // using useffect to display data on mount
  // data obtained from firestore
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  const customStyle = {
    width: 270,
    height: 400,
  };

  const avatarStyle = {
    width: 25,
    height: 25,
  };

  const snap = () => {
    dispatch(resetCameraImage());
    navigate("/home");
  };

  return (
    <div className="relative" style={customStyle}>
      <div className="flex rounded-md justify-between items-center px-2.5 bg-sky-500 h-12">
        <Avatar style={avatarStyle} />
        <div className="flex items-center flex-1 pl-2 ">
          <Search className="text-white" />
          <input
            placeholder="Friends"
            className="outline-none bg-transparent border-none text-sm text-white placeholder:text-white opacity-100"
          ></input>
        </div>
        <ChatBubble className="text-white" />
      </div>
      <div className="h-96 rounded-md bg-white shadow-md -mt-2 rounded-t-md overflow-scroll">
        {/* Mapping the data obtained from firestore and passing it to chat component using props */}
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageURL, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageURL}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <div className="flex justify-center">
        <RadioButtonUnchecked
          className="absolute bg-white rounded-full text-gray-500 cursor-pointer bottom-0 hover:text-black"
          onClick={snap}
          fontSize="large"
        />
      </div>
    </div>
  );
};

export default Chats;
