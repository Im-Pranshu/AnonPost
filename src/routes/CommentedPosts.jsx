import React from "react";
import { useOutletContext } from "react-router-dom";
import { getAuth } from "firebase/auth";
import PostList from "../components/PostList";

const CommentedPosts = () => {
  const posts = useOutletContext();

  const auth = getAuth();
  const user = auth.currentUser;

  if (!posts) return <div className="loader">Loading...</div>;

  return <PostList posts={posts} isCommentedPosts={true} userUID={user?.uid} />;
};

export default CommentedPosts;
