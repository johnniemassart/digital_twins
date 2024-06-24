import React from "react";
import "../css/Home.css";
import Moon from "../components/r3f/Moon";
import HomeHeader from "../components/home/HomeHeader";
import LogIn from "../components/home/LogIn";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Moon />
      <HomeHeader />
      {/* <LogIn /> */}
    </div>
  );
};

export default Home;
