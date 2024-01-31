import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { login, logout, selectUser } from "../features/appSlice";
import { auth } from "../firebase";

const PrivateRoute = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.profilePic,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }

      setLoading(false); // Set loading to false once authentication state is determined
    });

    // Clean up the subscription to avoid memory leaks
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    // Render a loading indicator while checking authentication state
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  // Render the child components if the user is authenticated
  return <Outlet />;
};

export default PrivateRoute;
