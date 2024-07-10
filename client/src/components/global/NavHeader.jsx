import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const NavHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();
  const [feed, setFeed] = useState(true);
  const [profile, setProfile] = useState(false);
  let location = useLocation();
  const feedClick = () => {
    if (feed === false) {
      setFeed(true);
      setProfile(false);
    } else if (feed === true) {
      return;
    }
  };
  const profileClick = () => {
    if (profile === false) {
      setProfile(true);
      setFeed(false);
    } else if (profile === true) {
      return;
    }
  };
  const handleLogout = () => {
    dispatch(logout());
    console.log("log out succesful");
    navigate("/");
  };
  useEffect(() => {
    if (location.pathname === `/${username}`) {
      setFeed(true);
      setProfile(false);
    }
    if (location.pathname === `/${username}/profile`) {
      setFeed(false);
      setProfile(true);
    }
  }, []);
  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <Link
          className="nav-links feed-btn"
          onClick={feedClick}
          style={{ backgroundColor: feed && "black" }}
          to={`/${username}`}
        >
          feed
        </Link>
        <Link
          className="nav-links profile-btn"
          onClick={profileClick}
          style={{
            backgroundColor: profile && "black",
          }}
          to={`/${username}/profile`}
        >
          profile
        </Link>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        log out
      </button>
    </div>
  );
};

export default NavHeader;
