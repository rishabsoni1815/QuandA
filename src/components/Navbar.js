import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import { Avatar, Button, Input } from "@material-ui/core";
import LogoImg from "../img/Logo.jpg";
import Modal from "react-modal";
import "../css/Navbar.css";
import { ExpandMore, Link } from "@material-ui/icons";
import { db } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

function Navbar({ handleLogout, userData }) {
  let userId = sessionStorage.getItem("userId");
  let navigate = useNavigate();
  const imgStyle = {
    height: "60px",
    width: "90px",
    marginRight: "30px",
    padding: "3px",
  };
  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1px",
    backgroundColor: "white",
    position: "sticky",
    width: "100%",
    zIndex: "1000",
    top: "0",
    boxShadow: "0px 5px 8px -9px rgba(0, 0, 0, 0.5)",
  };
  const iconsStyle = {
    display: "flex",
    marginRight: "20px",
  };
  const inputFiledStyle = {
    display: "flex",
    alignItems: "center",
    border: "1px solid lightgrey",
    padding: "5px",
    borderRadius: "5px",
    marginTop: "17px",
    marginRight: "20px",
  };
  const searchBarStyle = {
    backgroundColor: "transparent",
    outline: "none",
    border: "none",
    color: "rgb(49,49,49)",
  };
  const searchIconStyle = {
    color: "grey",
    cursor: "pointer",
  };
  const profileSectionStyle = {
    display: "flex",
    alignItems: "center",
  };
  const avatarStyle = {
    cursor: "pointer",
    marginTop: "15px",
  };
  const modalStyle = {
    overlay: {
      width: 700,
      height: 600,
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: "1000",
      top: "12%",
      left: "25%",
    },
  };
  const handleQuestion = async (e) => {
    e.preventDefault();

    setOpenModal(false);
    const docRef = await addDoc(collection(db, "questions"), {
      question: input,
      imageUrl: inputUrl,
      timeStamp: serverTimestamp(),
      userId: userId,
    }).then(async (res) => {
      var docId = res.id;
      const docRef = doc(db, "questions", docId);
      await updateDoc(docRef, {
        uid: docId,
      });
    });
    setInput("");
    setInputUrl("");
  };

  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  return (
    <div style={headerStyle}>
      <img src={LogoImg} alt="QuandA logo" style={imgStyle}></img>
      <div style={iconsStyle}>
        <div className="icons">
          <HomeIcon />
        </div>
        <div className="icons">
          <FeaturedPlayListOutlinedIcon />
        </div>
        <div className="icons">
          <AssignmentTurnedInOutlinedIcon />
        </div>
        <div className="icons">
          <PeopleAltOutlinedIcon />
        </div>
        <div className="icons">
          <NotificationsOutlinedIcon />
        </div>
      </div>
      <div style={inputFiledStyle}>
        <SearchIcon style={searchIconStyle} />
        <input style={searchBarStyle} type="text" placeholder="Search" />
      </div>
      <div style={profileSectionStyle}>
        <Avatar
          style={avatarStyle}
          onClick={() => {
            navigate("/profile");
          }}
          src={userData.img}
        />
        <div className="icons">
          <LanguageIcon />
        </div>
        <div className="button">
          <Button onClick={() => setOpenModal(true)}>Add Question</Button>
        </div>
        <div className="button">
          <Button style={{ marginLeft: "13px" }} onClick={handleLogout}>
            Log Out
          </Button>
          <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false} //on clicking outside modal modal will not close
            style={modalStyle}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar className="avatar" src={userData.img} />
              <p>Username :{userData.name} </p> {/*name from db or email */}
              <div className="modal__scope">
                <PeopleAltOutlinedIcon />
                <p>Public</p>
                <ExpandMore />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                type="text"
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Start your question with 'What, 'How', 'Why' etc."
              />
              <div className="modal__fieldLink">
                <Link />
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Optional: include a link that gives context"
                ></input>
              </div>
            </div>
            <div className="modal__buttons">
              <button onClick={() => setOpenModal(false)} className="close">
                Close
              </button>
              <button type="submit" className="add" onClick={handleQuestion}>
                Add Question
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
