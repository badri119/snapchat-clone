import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";
import ReactTimeago from "react-timeago";
import { selectImage, selectUser } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const avatarStyle = {
    width: 35,
    height: 35,
  };

  const picButoon = {
    width: 45,
    height: 45,
  };

  //function to see if the picture is not opened,  use dispatch to get the image,
  //and change the read key to true in the firestore
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      // once it's clicked, it'll go to the view page where you can view the picture
      navigate("/chat/view");
    }
  };

  return (
    <div
      className="flex justify-between p-2 items-center border-b border-solid border-b-slate-200 "
      onClick={open}
    >
      <Avatar style={avatarStyle} />
      <div className=" pl-1.5 flex-1">
        <h1 className="text-lg font-medium">{username}</h1>
        <p className="text-xs">
          {!read && "Tap to view -"}{" "}
          <ReactTimeago
            date={new Date(timestamp?.toDate()).toUTCString()}
          ></ReactTimeago>
        </p>
      </div>
      {!read && (
        <StopRounded
          className="text-red-600 cursor-pointer hover:opacity-80"
          style={picButoon}
        />
      )}
    </div>
  );
};

export default Chat;
