import { ChatBubble, Search } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Chat from "./Chat";
const Chats = () => {
  const [posts, setPosts] = useState([]);

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

  return (
    <div className="relative" style={customStyle}>
      <div className="flex justify-between items-center px-2.5 bg-sky-500 h-12">
        <Avatar style={avatarStyle} />
        <div className="flex items-center flex-1 pl-2 ">
          <Search />
          <input
            placeholder="Friends"
            className="outline-none bg-transparent border-none text-sm text-white placeholder:text-white opacity-100"
          ></input>
        </div>
        <ChatBubble className="" />
      </div>
      <div className="h-96 bg-white shadow-md -mt-2 rounded-t-md overflow-scroll">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Chats;
