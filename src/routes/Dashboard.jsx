import React from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import addPost from "../assets/add-post.png";

import { collection, query, orderBy, getDocs } from "firebase/firestore"; // Firebase Firestore imports
import { db } from "../firebaseConfig"; // Importing Firestore config
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Loader function to fetch data from Firebase
export async function loader() {
  const postCollection = collection(db, "posts");
  const q = query(postCollection, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return { posts };
}

export default function Dashboard() {
  const { posts } = useLoaderData(); // Use useLoaderData to access the data returned from the loader
  let location = useLocation();
  const auth = getAuth();
  const user = auth.currentUser;

  // Function to set the active tab based on the current location
  const getLinkClass = (path, extraClass = "") => {
    const isActive = location.pathname === path;
    return `${isActive ? "active" : ""} tabLink allBtn ${extraClass}`;
  };

  // Define the heading based on the current path, including post count
  const getHeading = () => {
    if (location.pathname.includes("create-post")) {
      return "Create Post";
    } else if (location.pathname.includes("my-posts")) {
      return `My Posts (${
        posts.filter((post) => post.createdBy === user?.uid).length
      })`;
    } else if (location.pathname.includes("commented-posts")) {
      // Filter posts where the user has commented
      const commentedPostsCount = posts.filter((post) =>
        post.comments.some((comment) => comment.createdBy === user?.uid)
      ).length;
      return `Commented Posts (${commentedPostsCount})`;
    } else if (location.pathname.includes("replied-posts")) {
      // Filter posts where the user has replied to any comment
      const repliedPostsCount = posts.filter((post) =>
        post.comments.some((comment) =>
          comment.replies?.some((reply) => reply.replierUID === user?.uid)
        )
      ).length;
      return `Replied Posts (${repliedPostsCount})`;
    } else {
      return `All Posts (${posts.length})`;
    }
  };

  return (
    <div className="dashboard">
      <div className="tabs">
        <Link to={"/dashboard"} className={getLinkClass("/dashboard")}>
          All Post
        </Link>
        <Link
          to={"/dashboard/my-posts"}
          className={getLinkClass("/dashboard/my-posts")}
        >
          My Posts
        </Link>
        <Link
          to={"/dashboard/commented-posts"}
          className={getLinkClass("/dashboard/commented-posts")}
        >
          Commented Post
        </Link>
        <Link
          to={"/dashboard/replied-posts"}
          className={getLinkClass("/dashboard/replied-posts")}
        >
          Replied Post
        </Link>
        <Link
          to={"/dashboard/create-post"}
          className={getLinkClass("/dashboard/create-post", "createPost")}
        >
          <img src={addPost} alt="add post logo" /> Create Post
        </Link>
      </div>
      <div className="details">
        <div className="dashboardIndex">
          {/* Display dynamic heading with post count */}
          <h2>{getHeading()}</h2>{" "}
          <div className="postDetailsOutlet">
            {/* Pass posts data to child routes */}
            <Outlet context={posts} />
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
