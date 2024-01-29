import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvvShh6JgWilekXmZ59eXZ_JrEqnKX5v4",
  authDomain: "snapchat-clone-934c7.firebaseapp.com",
  projectId: "snapchat-clone-934c7",
  storageBucket: "snapchat-clone-934c7.appspot.com",
  messagingSenderId: "1095926411764",
  appId: "1:1095926411764:web:58fd75bf39379f6a6209a1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig); // Initalizing firebase
const db = firebaseApp.firestore(); // Conencting firestore
const auth = firebase.auth(); //Initalizing Authenticaion (Used google)
const storage = firebase.storage(); // Initialzing Storage
const provider = new firebase.auth.GoogleAuthProvider(); //Google Authentication

export { db, auth, storage, provider };
