import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCameraImage, resetCameraImage } from "../features/cameraSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const imageStyle = {
  width: 250,
  height: 400,
};

const Preview = () => {
  const navigate = useNavigate();
  const cameraImage = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  useEffect(() => {
    //if a pciture is not taken, it redirects to the homepage
    if (!cameraImage) {
      navigate("/", { replace: true }); //replace means you can't go back to the preview page by replacing the history
    }
  }, [cameraImage, navigate]);
  // console.log(cameraImage);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  return (
    <div className="relative">
      <CloseIcon
        className="absolute m-1 text-white cursor-pointer"
        onClick={closePreview}
      />
      <img style={imageStyle} src={cameraImage} alt=""></img>
    </div>
  );
};

export default Preview;
