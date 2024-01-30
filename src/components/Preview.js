import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCameraImage, resetCameraImage } from "../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";
import "../css/preview.css";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import { db, storage } from "../firebase";

const imageStyle = {
  width: 250,
  height: 400,
};

const iconSize = {
  fontSize: 30,
};

const Preview = () => {
  const navigate = useNavigate();
  const cameraImage = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  useEffect(() => {
    //if a picture is not taken, it redirects to the homepage
    if (!cameraImage) {
      navigate("/home", { replace: true }); //replace means you can't go back to the preview page and it bascially replaces the history
    }
  }, [cameraImage, navigate]);
  // console.log(cameraImage);

  // Function to send post
  const sendPost = async () => {
    try {
      const id = uuidv4();

      // Upload the image
      const upload = storage
        .ref(`posts/${id}`)
        .putString(cameraImage, "data_url");
      await upload;

      // Get the download URL
      const url = await storage.ref("posts").child(id).getDownloadURL();
      //console.log(url);

      // Add the post to the collection with the keys
      await db.collection("posts").add({
        imageURL: url,
        username: "Badri",
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Navigate to "/chat"
      navigate("/chat");
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  return (
    <div className="relative">
      <CloseIcon
        className="absolute m-1 text-white cursor-pointer hover:bg-white hover:text-black hover:rounded-full"
        onClick={closePreview}
        style={iconSize}
      />

      <img
        className="rounded-md"
        style={imageStyle}
        src={cameraImage}
        alt=""
      ></img>
      <div
        onClick={sendPost}
        className="absolute right-2 bottom-2 text-black bg-yellow-300 rounded-2xl flex px-1 justify-evenly items-center cursor-pointer gap-1 hover:scale-105 transition delay-50 duration-300 ease-in-out"
      >
        <p className="font-bold text-sm p-1">Send Now</p>
        <SendIcon className="send" />
      </div>
    </div>
  );
};

export default Preview;
