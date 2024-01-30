import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/appSlice";

const PrivateRoute = ({ component: component, ...rest }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // console.log(token);
  return (
    <div>
      {(() => {
        if (token) {
          return <Outlet />;
        } else {
          return <Navigate to="/" />;
        }
      })()}
    </div>
  );
};

export default PrivateRoute;
