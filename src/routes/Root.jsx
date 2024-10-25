import React, { useState, useEffect } from "react";
import hamburger from "../assets/hamburger.png";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export async function loader({ request, params }) {
  console.log("ROOT LOADER RUNNING");
  return {
    name: null, // Loader does not handle localStorage; client-side will handle this
  };
}

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
