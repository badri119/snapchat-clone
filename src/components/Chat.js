import { Avatar } from "@mui/material";
import React from "react";

const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  return (
    <div>
      <Avatar src={profilePic} className="" />
      <div className="">
        <h4 className="text-xl">{username}</h4>
        <p>Tap to view - {new Date(timestamp?.toDate()).toUTCString()}</p>
      </div>
    </div>
  );
};

export default Chat;
