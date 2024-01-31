import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const videoConstraints = {
  width: 350,
  height: 550,
  facingMode: "user",
};

const customButton = {
  fontSize: "60px",
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
        className="rounded-md"
        audio={false}
        height={videoConstraints.height}
        ref={WebcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      ></Webcam>
      <div className="absolute bottom-0 flex w-full justify-center text-white mb-1">
        <RadioButtonUncheckedIcon style={customButton} onClick={capture} />
      </div>
    </div>
  );
};

export default WebcamCapture;
