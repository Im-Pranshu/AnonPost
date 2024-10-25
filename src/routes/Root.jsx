import React, { useState, useEffect } from "react";
import hamburger from "../assets/hamburger.png";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ request, params }) {
  // trim url to get the name of the path.
  // function trimSubstring(str, substring) {
  //   return str.replace(substring, "");
  // }
  // const originalString = request.url;
  // const trimmedString = trimSubstring(originalString, "http://localhost:5173/");

  // if (
  //   trimmedString == "account-created" ||
  //   trimmedString == "dashboard" ||
  //   trimmedString == "dashboard/create-post"
  // ) {
  //   return {
  //     name: localStorage.getItem("userName"),
  //   };
  // }

  console.log("ROOT LOADER RUNNING");
  return {
    name: null,
  };
}

const index = () => {
  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("redirectToSignIn", "true"); // Set a flag to redirect
    window.location.reload(); // Refresh the page
  };

  // Initialize `loginStatus` state with `null`, and load it in `useEffect` to access `localStorage` in client-side only
  const [loginStatus, setLoginStatus] = useState(null);

  // Access loader data from the `loader` function, which returns `name: null` initially
  const loaderData = useLoaderData();

  // State to store `name`, initialize with loader data
  const [name, setName] = useState(loaderData.name);

  useEffect(() => {
    // On client-side load, retrieve `loginStatus` and `userName` from `localStorage`
    const storedLoginStatus = localStorage.getItem("login");
    setLoginStatus(storedLoginStatus);

    // Retrieve `userName` and update state if available
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []); // Run only once when component mounts

  return (
    <div className="rootRoute">
      <nav className="navBar">
        <div className="navLogo">
          <img src={hamburger} alt="nav bar of the app" />
          <Link to={loginStatus ? "/dashboard" : "/"} className="appName">
            ANONYMOUS
          </Link>
        </div>
        <div className="userLog">
          <p className="appName">{name}</p>
          <button
            className={loginStatus ? "showLogOut" : "hideLogOut"}
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};
export default index;
