import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectAuth } from "../redux/authSlice";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user != null ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
