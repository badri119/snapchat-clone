import { Logout, RadioButtonUnchecked } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";
import "../css/chats.css";

const customButton = {
  fontSize: "60px",
};
const customStyle = {
  width: 350,
  height: 550,
};

const avatarStyle = {
  width: 25,
  height: 25,
};

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(user);
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
  // console.log(posts);

  const snap = () => {
    dispatch(resetCameraImage());
    navigate("/home");
  };

  const signout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div className="relative" style={customStyle}>
      <div className="flex rounded-md justify-between items-center px-2.5 bg-sky-500 h-12">
        <Avatar src={user.profilePic} style={avatarStyle} />

        <div className="has-tooltip">
          <span className="tooltip text-sm font-bold w-28 rounded shadow-lg p-1 bg-gray-100 text-sky-500 -mt-8">
            Click to Logout
          </span>
          <Logout
            className="text-white hover:scale-105 hover:opacity-50"
            onClick={signout}
          />
        </div>
      </div>
      <div className="h-full rounded-md bg-white shadow-md -mt-2 rounded-t-md overflow-scroll">
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
          className="absolute bg-white rounded-full text-gray-500 cursor-pointer bottom-0 hover:text-black text-4xl"
          onClick={snap}
          style={customButton}
        />
      </div>
    </div>
  );
};

export default Chats;
