import React from "react";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import PostList from "../components/PostList";

const MyPosts = () => {
  const posts = useOutletContext(); // Receive all posts from Dashboard.jsx

  const auth = getAuth(); // Initialize Firebase auth to get current user
  const user = auth.currentUser; // Get the current user

  // If the post is not found or still loading, show a loader
  if (!posts) return <div className="loader">Loading...</div>;

  return <PostList posts={posts} isMyPosts={true} userUID={user?.uid} />;
};

export default MyPosts;
