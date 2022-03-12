import React, { useState, useEffect } from "react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import RepeatOutlinedIcon from "@material-ui/icons/RepeatOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { MoreHorizOutlined, ShareOutlined } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import Modal from "react-modal";
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import "../css/Post.css";

function Post({ userData, question, image, timeStamp, userId, uid }) {
  const [openModal, setOpenModal] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerArray, updateanswerArray] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userQuestionData, seruserQuestionData] = useState("");
  useEffect(async () => {
    await getUserData();
  }, [userId]);

  const getUserData = async () => {
    const docRef = query(
      collection(db, "users"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(docRef);
    querySnapshot.forEach((doc) => {
      seruserQuestionData(doc.data());
    });
  };

  const getAnswers = async () => {
    if (showAnswer === false) {
      setShowAnswer(true);
      const docRef = doc(db, "questions", uid);
      var queryPosts = "";
      queryPosts = query(
        collection(docRef, "answers"),
        orderBy("timeStamp", "desc")
      );
      const querySnapshot = await getDocs(queryPosts);
      if (querySnapshot._snapshot.docChanges.length != 0) {
        querySnapshot.forEach((doc) => {
          updateanswerArray((arr) => [...arr, doc.data()]);
        });
      }
    }
  };
  const hideAnswers = () => {
    setShowAnswer(false);
    updateanswerArray([]);
  };
  const handleAnswer = async (e) => {
    hideAnswers();
    e.preventDefault();
    if (uid) {
      const docRef = doc(db, "questions", uid);
      var name = "";
      name = userData.name ? userData.name : "";
      await addDoc(collection(docRef, "answers"), {
        answer: answer,
        userId: userId,
        timeStamp: serverTimestamp(),
        answeredBy: name,
      }).then(async (res) => {
        var docId = res.id;
        const docRef = doc(db, "questions", uid);
        const ansDoc = doc(docRef, "answers", docId);
        await updateDoc(ansDoc, {
          uid: docId,
        });
      });
    }
    setOpenModal(false);
    setAnswer("");
  };
  return (
    <div className="post">
      <div className="post__info">
        <Avatar src={userQuestionData.img} />
        <h4>{userQuestionData.name}</h4>
        <small>{new Date(timeStamp?.toDate()).toLocaleString()}</small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{question}</p>
          <button
            className="post__btnAnswer"
            onClick={() => setOpenModal(true)}
          >
            Answer
          </button>
          <Modal
            isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={false}
            style={{
              overlay: {
                width: 680,
                height: 550,
                backgroundColor: "rgba(0,0,0,0.8)",
                zIndex: "1000",
                top: "50%",
                left: "50%",
                marginTop: "-250px",
                marginLeft: "-350px",
              },
            }}
          >
            <div className="modal__question">
              <h1>{question}</h1>
              <p>
                asked by <span className="name"></span> {userQuestionData.name}{" "}
                on{" "}
                <span className="name">
                  {new Date(timeStamp?.toDate()).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter Your Answer"
                type="text"
                required
              />
            </div>
            <div className="modal__button">
              <button className="close" onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button type="sumbit" className="add" onClick={handleAnswer}>
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        <div className="post__answer">
          {showAnswer && (
            <div>
              {answerArray.map((doc) => (
                <div
                  key={doc.uid}
                  style={{ position: "relative", paddingBottom: "5px" }}
                >
                  <div
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      display: "flex",
                      right: "0px",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                    }}
                  >
                    {doc.answer}
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#b92b27",
                        fontSize: "14px",
                        textAlign: "right",
                        paddingRight: "30px",
                      }}
                    >
                      - answered by {doc.answeredBy} on{" "}
                      {new Date(doc.timeStamp?.toDate()).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button type="sumbit" className="close" onClick={getAnswers}>
            See Answers
          </button>
          <button type="sumbit" className="add" onClick={hideAnswers}>
            Hide
          </button>
        </div>
        {image && <img src={image} alt="image"></img>}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlinedIcon />
          <ArrowDownwardOutlinedIcon />
        </div>
        <RepeatOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
        <div className="post__footerLeft">
          <ShareOutlined />
          <MoreHorizOutlined />
        </div>
      </div>
    </div>
  );
}

export default Post;
