import React, { useEffect, useState } from "react";
import Post from "./Post";
import QuestionBox from "./QuestionBox";
import { db } from "../firebase";
import { collection, orderBy, query, where, getDocs } from "firebase/firestore";

function Feed({ userData }) {
  const design = {
    flex: "0.6",
    display: "flex",
    flexDirection: "column",
  };
  const [posts, updatepostsArray] = useState([]);

  useEffect(async () => {
    var queryPosts = "";
    queryPosts = query(
      collection(db, "questions"),
      orderBy("timeStamp", "desc")
    );
    const querySnapshot = await getDocs(queryPosts);
    if (querySnapshot._snapshot.docChanges.length != 0) {
      querySnapshot.forEach((doc) => {
        const data = {
          data: doc.data(),
          id: doc.id,
        };
        updatepostsArray((arr) => [...arr, data]);
      });
    }
  }, []);
  return (
    <div style={design}>
      <QuestionBox userData={userData} />
      {posts.map((doc) => (
        <Post
          userData={userData}
          key={doc.id}
          image={doc.data.imageUrl}
          question={doc.data.question}
          timeStamp={doc.data.timeStamp}
          userId={doc.data.userId}
          uid={doc.data.uid}
        />
      ))}
    </div>
  );
}

export default Feed;
