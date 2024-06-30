import React from "react";
import "../css/Dashboard.css";
import { selectAuth } from "../redux/authSlice";
import { useSelector } from "react-redux";
import NavHeader from "../components/global/NavHeader";
import DashboardTags from "../components/dashboard/DashboardTags";
import DashboardFeed from "../components/dashboard/DashboardFeed";

const Dashboard = () => {
  //   const user = useSelector(selectAuth);
  //   console.log(user);
  return (
    <div className="dashboard-wrapper">
      <NavHeader />
      <DashboardTags />
      <DashboardFeed />
    </div>
  );
};

export default Dashboard;
