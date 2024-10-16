import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import addPost from "../assets/add-post.png";
import { useLocation } from "react-router-dom";
import postData from "../postData.json"; // Importing JSON data

// export function loader() {
//   // api call
//   const data = [{}];

//   return data;
// }

export default function Dashboard() {
  let location = useLocation();

  const [postCount, setPostCount] = useState(0); // State to store the number of posts

  // useEffect to fetch post data when the component mounts
  useEffect(() => {
    // Function to fetch post data
    const fetchPosts = () => {
      // Simulating a delay for data fetching
      setTimeout(() => {
        setPostCount(postData.posts.length); // Update state with the number of posts
      }, 500); // 500ms delay for demonstration
    };

    fetchPosts(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="dashboard">
      <div>
        <div className="tabs">
          <Link to={"/dashboard"} className="active tabLink">
            All Post
          </Link>
          <Link className="tabLink">Commented Post</Link>
          <Link className="tabLink">Replied Post</Link>
          <Link to={"/dashboard/create-post"} className="createPost">
            <img src={addPost} alt="add post logo" /> Create Post
          </Link>
        </div>
      </div>
      <div className="details">
        <div className="dashboardIndex">
          <h2>
            {/* check karega agar url me create-post hai to Create Post dikhao warna All Post */}
            {location.pathname.includes("create-post")
              ? "Create Post"
              : `All Post (${postCount})`}
          </h2>
          <div className="postDetailsOutlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
