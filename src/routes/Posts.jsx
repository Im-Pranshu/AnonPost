import React, { useState, useEffect } from "react"; // Importing React and hooks
import { Link } from "react-router-dom"; // Importing Link for navigation
import postData from "../postData.json"; // Importing JSON data

export const Post = () => {
  const [posts, setPosts] = useState(null); // State to hold the posts

  // useEffect to simulate fetching data
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        // Simulating a network request
        setPosts(postData.posts); // Set posts from JSON data
        // setLoading(false); // Set loading to false after data is fetched
      }, 500); // Simulating a delay of 1 second
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs once on component mount

  // Display loader if data is still loading
  if (!posts) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboardIndex">
      {/* Main container for the posts */}

      {/* Mapping over the posts array */}
      {posts.map((post) => (
        // Creating a Link component for each post
        <Link to={`/dashboard/${post.id}`} className="post" key={post.id}>
          <p>{post.title}</p> {/* Displaying the post title */}
          <div className="postDetails">
            {/* Container for post details */}
            <p>{post.commentReply.commentsCount} Comment</p>
            {/* Displaying number of comments */}
            <p>{post.commentReply.repliesCount} Reply</p>
            {/* Displaying number of replies */}
          </div>
        </Link>
      ))}
    </div>
  );
};
