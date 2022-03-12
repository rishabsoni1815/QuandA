import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import { useNavigate } from "react-router-dom";
import {
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";

function Home() {
  const [userData, setData] = useState("");
  let navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    sessionStorage.removeItem("userId");
    navigate("/");
  };
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }

    if (!authToken) {
      navigate("/");
    }

    getData();
  }, [userId]);

  const getData = async () => {
    const docRef = query(
      collection(db, "users"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      setData(doc.data());
    });
  };
  const design = {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  };
  return (
    <div>
      <Navbar handleLogout={() => handleLogout()} userData={userData} />
      <div style={design}>
        <Sidebar />
        <Feed userData={userData} />
        <Widget />
      </div>
    </div>
  );
}

export default Home;
