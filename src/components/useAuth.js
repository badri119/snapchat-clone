import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login, logout } from "../features/appSlice";

const useAuth = () => {
  const dispatch = useDispatch();

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
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuth;
