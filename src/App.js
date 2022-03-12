import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";
import Profile from "./components/Profile";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/home");
    }
  }, []);
  const handleLoginAction = () => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        sessionStorage.setItem("userId", response.user.uid);
        console.log(response);
        navigate("/home");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/wrong-password") {
          toast.error("Please check the Password");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Please check the Email");
        }
        if (error.code === "auth/invalid-email") {
          toast.error("Please check the Email");
        }
      });
  };
  const handleRegisterAction = () => {
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
      .then(async (response) => {
        const docRef = await addDoc(collection(db, "users"), {
          userId: response.user.uid, //userId(generated on signup) is used as userId everywhere(in que,answ,profile etc)
        }).then((docRef) => {
          sessionStorage.setItem("userId", response.user.uid);
          console.log(docRef);
        });
        navigate("/home");
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email Already in Use");
        }
        if (error.code === "auth/weak-password") {
          toast.error("Password should be atleast of 6 length");
        }
      });
  };
  return (
    <div className="App">
      <>
        <ToastContainer />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/"
            element={
              <Login
                setEmail={setEmail}
                setPassword={setPassword}
                handleLoginAction={() => handleLoginAction()}
                handleRegisterAction={() => handleRegisterAction()}
              />
            }
          />
        </Routes>
      </>
    </div>
  );
}

export default App;
