import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const View = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();

  const quit = () => {
    navigate("/chat", { replace: true });
  };
  useEffect(() => {
    // if user directly comes here without an image, it'll quit which basically navigates back to chat screen
    if (!selectedImage) {
      quit();
    }
  }, [selectedImage]);

  return (
    <div className="relative bg-yellow-400 rounded-md">
      <img
        src={selectedImage}
        alt="user"
        onClick={quit}
        className="cursor-pointer"
      ></img>
      <div className="absolute top-0 right-0 m-2.5">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 7, 3, 0]}
          className="absolute top-0 right-0 m-2.5"
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              quit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default View;
