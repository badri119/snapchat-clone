import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase";
import { login } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(provider);
      // console.log(result);

      dispatch(
        login({
          username: result.user.displayName,
          profilePic: result.user.photoURL,
          id: result.user.uid,
        })
      );
      navigate("/chat");
    } catch (error) {
      console.error("Authentication Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="flex flex-col">
        <h1 className="text-4xl mb-5 font-serif">Sign in to get started </h1>
        <div className="flex justify-center">
          <Button variant="outlined" className="w-2/4" onClick={signIn}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
