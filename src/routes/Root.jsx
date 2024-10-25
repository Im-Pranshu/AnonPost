import React from "react";
import hamburger from "../assets/hamburger.png";
import { Link, Outlet } from "react-router-dom";

const index = () => {
  const loginStatus = localStorage.getItem("login");
  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("redirectToSignIn", "true"); // Set a flag to redirect
    window.location.reload(); // Refresh the page
  };
  const name = localStorage.getItem("userName");

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
          <p className="appName">{loginStatus ? name : ""}</p>
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
