import React from "react"; // Importing React and hooks
import { useOutletContext } from "react-router-dom"; // Importing Link for navigation
import PostList from "../components/PostList";

const Post = () => {
  const posts = useOutletContext(); // Access posts data from the parent Dashboard

  // If the post is not found or still loading, show a loader
  if (!posts) return <div className="loader">Loading...</div>;

  return <PostList posts={posts} isMyPosts={false} />;
};

export default Post;
