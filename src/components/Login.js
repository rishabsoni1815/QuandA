import React, { useState } from "react";
import LogoImg from "../img/Logo.jpg";
import "../css/Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function Login({
  setPassword,
  setEmail,
  handleLoginAction,
  handleRegisterAction,
}) {
  return (
    <div className="logins">
      <div className="login__container">
        <div className="login__logo">
          <img src={LogoImg} alt="QuandA" height="120px" />
        </div>
        <div className="login__desc">
          <p>A Place to Share knowledge and better understand the world</p>
          <p style={{ color: "royalblue", fontSize: "20px" }}>
            HandCrafted with ❤️ by{" "}
          </p>
          <h3>Rishab Soni</h3>
        </div>
        <div className="login__auth">
          <div className="login__emailPass">
            <div className="login__label">
              <h4 style={{ marginLeft: "10px" }}>Login</h4>
            </div>
            <div className="login__inputFields">
              <div className="login__inputField">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="login__inputField">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__forgButt">
              <small style={{ marginLeft: "3px" }}>Forgot Password?</small>
              <button onClick={handleLoginAction}>Login</button>
            </div>
            <button onClick={handleRegisterAction}>Register</button>
          </div>
        </div>
        <div className="login__lang">
          <p>हिन्दी</p>
          <ArrowForwardIosIcon fontSize="small" />
        </div>
        <div className="login__footer">
          <p>About</p>
          <p>Languages</p>
          <p>Careers</p>
          <p>Businesses</p>
          <p>Privacy</p>
          <p>Terms</p>
          <p>Contact</p>
          <p>&copy; QuandA Fake Inc. 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
