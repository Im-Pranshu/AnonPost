import { React, useState, useEffect } from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import addPost from "../assets/add-post.png";

import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore imports
import { db } from "../firebaseConfig"; // Importing Firestore config

// Loader function to fetch data from Firebase
export async function loader() {
  const postCollection = collection(db, "posts"); // Replace 'posts' with your Firestore collection name
  const postSnapshot = await getDocs(postCollection); // Fetch the documents
  const posts = postSnapshot.docs.map((doc) => doc.data()); // Map data

  return { posts }; // Return posts as part of the loader data
}

export default function Dashboard() {
  const { posts } = useLoaderData(); // Use useLoaderData to access the data returned from the loader
  console.log(posts);
  let location = useLocation();

  const [postCount, setPostCount] = useState(0); // State to store the number of posts

  // Set post count when data is available
  useEffect(() => {
    setPostCount(posts.length); // Update state with the number of posts
  }, [posts]);

  return (
    <div className="dashboard">
      <div className="tabs">
        <Link to={"/dashboard"} className="active tabLink">
          All Post
        </Link>
        <Link className="tabLink">Commented Post</Link>
        <Link className="tabLink">Replied Post</Link>
        <Link to={"/dashboard/create-post"} className="createPost tabLink">
          <img src={addPost} alt="add post logo" /> Create Post
        </Link>
      </div>
      <div className="details">
        <div className="dashboardIndex">
          <h2>
            {/* check karega agar url me create-post hai to Create Post dikhao warna All Post */}
            {location.pathname.includes("create-post")
              ? "Create Post"
              : `All Post (${posts.length})`}
          </h2>
          <div className="postDetailsOutlet">
            <Outlet context={posts} /> {/* Pass posts data to child routes */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Old Approach
// const [postCount, setPostCount] = useState(0); // State to store the number of posts

//   // useEffect to fetch post data when the component mounts
//   useEffect(() => {
//     // Function to fetch post data
//     const fetchPosts = () => {
//       // Simulating a delay for data fetching
//       setTimeout(() => {
//         setPostCount(postData.posts.length); // Update state with the number of posts
//       }, 500); // 500ms delay for demonstration
//     };

//     fetchPosts(); // Call the fetch function
//   }, []); // Empty dependency array to run only on mount

// Later New
// Loader function to fetch data (simulating Local API call)
// export async function loader() {
//   const posts = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(postData.posts); // Simulated API response
//     }, 500); // Simulating a delay of 500ms
//   });
//   return { posts };
// }

// inside return
// const { posts } = useLoaderData(); // Using loader to get data
