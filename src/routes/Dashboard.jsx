import React from "react";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import addPost from "../assets/add-post.png";
import postData from "../postData.json"; // Importing JSON data

// Loader function to fetch data (simulating API call)
export async function loader() {
  const posts = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(postData.posts); // Simulated API response
    }, 500); // Simulating a delay of 500ms
  });
  return { posts };
}

export default function Dashboard() {
  let location = useLocation();
  const { posts } = useLoaderData(); // Using loader to get data
  // console.log(posts);

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
