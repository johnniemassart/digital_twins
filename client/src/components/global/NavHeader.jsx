import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const NavHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    console.log("log out succesful");
    navigate("/");
  };
  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <Link className="nav-links feed-btn">feed</Link>
        <Link className="nav-links profile-btn">profile</Link>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        log out
      </button>
    </div>
  );
};

export default NavHeader;
