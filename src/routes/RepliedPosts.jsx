import React from "react";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import PostList from "../components/PostList";

const RepliedPosts = () => {
  const posts = useOutletContext();

  const auth = getAuth();
  const user = auth.currentUser;

  if (!posts) return <div className="loader">Loading...</div>;

  return <PostList posts={posts} isRepliedPosts={true} userUID={user?.uid} />;
};

export default RepliedPosts;
