import React from "react";
import { useGetFollowingPostsQuery } from "../../redux/postApi";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";

const DashboardFeed = () => {
  const { user_id } = useSelector(selectAuth);
  //   console.log(user_id);
  const { data: followingPostsData, isSuccess } =
    useGetFollowingPostsQuery(user_id);
  return (
    <div className="dashboard-feed-wrapper">
      {isSuccess &&
        followingPostsData.map((post) => {
          return (
            <div
              key={post.id}
              style={{ color: "white", border: "1px solid green" }}
              className="following-post-wrapper"
            >
              <p>{post.title}</p>
              <p>{post.content}</p>
              <p>{post.author}</p>
            </div>
          );
        })}
    </div>
  );
};

export default DashboardFeed;
