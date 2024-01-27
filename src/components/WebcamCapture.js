import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

const WebcamCapture = () => {
  const navigate = useNavigate();
  const WebcamRef = useRef(null);
  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSource = WebcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSource));
    // console.log(imageSource);
    navigate("/preview");
  }, [WebcamRef]);
  return (
    <div className="relative">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={WebcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      ></Webcam>
      <div className="absolute bottom-0 flex w-full justify-center text-white mb-1">
        <RadioButtonUncheckedIcon fontSize="large" onClick={capture} />
      </div>
    </div>
  );
};

export default WebcamCapture;
