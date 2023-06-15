import React from "react";
import BackgroundChatImage from "../components/svgs/BackgroundChatImage";
import "../css/Home.css";
import SecurityLogo from "../components/svgs/SecurityLogo";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-container">
      <h1 className="heading"> --Chat App--</h1>
      <BackgroundChatImage className="background-chat-image" />
      <h2 className="heading-2">Stay connected with your friends and family</h2>
      <div className="secure-show-container">
        <SecurityLogo />
        <p>Secure, private messaging</p>
      </div>
      <Link to="/login" className="button-link">
        <Button buttonText={"Get Started"} />
      </Link>
    </div>
  );
};

export default Home;
