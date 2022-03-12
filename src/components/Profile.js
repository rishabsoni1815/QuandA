import React, { useEffect, useState } from "react";
import LogoImg from "../img/Logo.jpg";
import "../css/Profile.css";
import {
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { useNavigate } from "react-router-dom";

function Profile() {
  const userId = sessionStorage.getItem("userId");

  let navigate = useNavigate();

  useEffect(async () => {
    await getData();
  }, [userId]);

  const getData = async () => {
    var docuid = "";
    var docname = "";
    var docdate = "";
    var doctag = "";
    var docimg = "";
    const docRef = query(
      collection(db, "users"),
      where("userId", "==", userId)
    );
    console.log(userId);
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      docuid = doc.id;
      docname = doc.data().name;
      docdate = doc.data().date;
      doctag = doc.data().tagLine;
      docimg = doc.data().img;
    });
    setName(docname);
    setTag(doctag);
    setImg(docimg);
    setDate(docdate);
    setUid(docuid);
  };

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [tag, setTag] = useState("");
  const [img, setImg] = useState("");
  const [uid, setUid] = useState("");

  const handleUpdate = async () => {
    await updateDoc(doc(db, "users", uid), {
      name: name ? name : "",
      date: date ? date : "",
      tagLine: tag ? tag : "",
      img: img ? img : "",
    });
    navigate("/home");
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <img src={LogoImg} alt="QuandA" height="120px" />
        </div>
        <div className="login__desc">
          <h3>Profile</h3>
        </div>
        <div className="login__auth">
          <div className="login__emailPass">
            <div className="login__label">
              <h4 style={{ marginLeft: "10px" }}>Add / Edit Profile</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                />
              </div>
              <div className="login__inputField">
                <input
                  type="date"
                  placeholder="Date Of Birth"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="login__inputField">
                <input
                  type="text"
                  placeholder="TagLine"
                  value={tag}
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                />
              </div>
              <div className="login__inputField">
                <input
                  type="link"
                  placeholder="Image"
                  value={img}
                  onChange={(e) => {
                    setImg(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small style={{ marginLeft: "3px" }}>
                To update your details click Update Button
              </small>
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
