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
    name: null, // Loader does not handle localStorage; client-side will handle this
  };
}

const index = () => {
  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("redirectToSignIn", "true"); // Set a flag to redirect
    window.location.reload(); // Refresh the page
  };

  const loaderData = useLoaderData();
  const [name, setName] = useState(loaderData.name);
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("login") || null
  ); // Initialize login status from `localStorage`

  // useEffect(() => {
  //   // Retrieve `name` only once after initial render
  //   const storedName = localStorage.getItem("userName");
  //   if (storedName) setName(storedName); // Set `name` if found in localStorage
  // }, []);

  // // When localStorage updates `loginStatus`, sync it with component state
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setLoginStatus(localStorage.getItem("login"));
  //     setName(localStorage.getItem("userName"));
  //   };
  //   window.addEventListener("storage", handleStorageChange); // Listen for any localStorage changes

  //   return () => window.removeEventListener("storage", handleStorageChange); // Cleanup event listener on component unmount
  // }, []);

  // Fetch login status and username from localStorage
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("login");
    setLoginStatus(storedLoginStatus);

    const storedName = localStorage.getItem("userName");
    setName(storedName);
  }, []); // Run only on initial mount

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
