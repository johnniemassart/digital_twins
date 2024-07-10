import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";
import { useGetProfileQuery } from "../../redux/profileApi";

const ProfileAccount = () => {
  const { user_id } = useSelector(selectAuth);
  const { data: profileData } = useGetProfileQuery(user_id);
  //   console.log(profileData);
  return (
    <div className="profile-account">
      <div className="profile-pic-wrapper">
        <img
          src={profileData?.profile_pic}
          alt={`${profileData?.user}'s profile picture`}
          className="profile-pic"
        />
      </div>
      <div className="profile-about-wrapper">
        <p>[ about {profileData?.user} ]</p>
        <br />
        <p>{profileData?.about}</p>
      </div>
    </div>
  );
};

export default ProfileAccount;
