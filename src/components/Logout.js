import { Button } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    auth.signOut();
  };
  return (
    <div>
      <button
        className="border p-2 text-lg rounded-md border-black bg-white hover:bg-blue-600 hover:text-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
