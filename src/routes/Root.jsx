import React from "react";
import hamburger from "../assets/hamburger.png";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ request, params }) {
  // trim url to get the name of the path.
  function trimSubstring(str, substring) {
    return str.replace(substring, "");
  }
  const originalString = request.url;
  const trimmedString = trimSubstring(originalString, "http://localhost:5173/");
  console.log("ROOT LOADER RUNNING", trimmedString);

  if (
    trimmedString == "account-created" ||
    trimmedString == "dashboard" ||
    trimmedString == "dashboard/create-post"
  ) {
    return {
      name: localStorage.getItem("userName"),
    };
  }

  return {
    name: null,
  };
}

const index = () => {
  const { name } = useLoaderData();

  const loginStatus = localStorage.getItem("login");

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("redirectToSignIn", "true"); // Set a flag to redirect
    window.location.reload(); // Refresh the page
  };

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
