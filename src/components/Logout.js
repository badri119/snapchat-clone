import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Logout = () => {
  const navigate = useNavigate();
  const logout = async () => {
    // localStorage.removeItem("token");

    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
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
