import React from "react";
import { Avatar } from "@material-ui/core";

function QuestionBox({ userData }) {
  const design = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    border: "1px solid lightgray",
    backgroundColor: "white",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const innerDesign = {
    display: "flex",
    alignItems: "center",
  };
  const hStyle = {
    color: "rgb(129,129,129)",
    fontWeight: "500",
    marginLeft: "10px",
  };
  const innerDesignTwo = {
    display: "flex",
    marginTop: "8px",
  };
  const pStyle = {
    color: "gray",
    fontWeight: "bold",
    fontSize: "large",
  };
  return (
    <div style={design}>
      <div style={innerDesign}>
        <Avatar src={userData.img} />
        <h4 style={hStyle}>{userData.name}</h4>
      </div>
      <div style={innerDesignTwo}>
        <p style={pStyle}>What is your question or link?</p>
      </div>
    </div>
  );
}

export default QuestionBox;
