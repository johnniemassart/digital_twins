import React from "react";
import "../css/Profile.css";
import NavHeader from "../components/global/NavHeader";
import ProfileAccount from "../components/profile/ProfileAccount";
import ProfileProfile from "../components/profile/ProfileProfile";

const Profile = () => {
  return (
    <div className="profile-wrapper">
      <NavHeader />
      <ProfileAccount />
      <ProfileProfile />
    </div>
  );
};

export default Profile;
