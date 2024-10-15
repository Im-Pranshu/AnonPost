import React from "react";
import { Link, Outlet } from "react-router-dom";
import addPost from "../assets/add-post.png";
import {useLocation} from 'react-router-dom';


// export function loader() {
//   // api call
//   const data = [{}];

//   return data;
// }


export default function Dashboard() {
  let location = useLocation();
  // let data = useLoader();

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
            {location.pathname.includes("create-post")
              ? "Create Post"
              : "All Post(10)"}
          </h2>
          <div className="postDetailsOutlet">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
