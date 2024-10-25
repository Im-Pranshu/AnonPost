import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

export default function Index() {
  const navigate = useNavigate(); // Initialize the navigate function from react-router

  useEffect(() => {
    // Check if the redirectToSignIn flag is set in localStorage
    const redirectToSignIn = localStorage.getItem("redirectToSignIn");

    // If the flag exists, it means we need to navigate to the sign-in page
    if (redirectToSignIn) {
      localStorage.removeItem("redirectToSignIn"); // Clear the flag to prevent repeated redirects
      navigate("/sign-in"); // Navigate to the sign-in page
    }
  }, [navigate]); // Effect runs whenever the navigate function changes

  return (
    <div className="index">
      <div className="rocketDiv">
        <img src={rocket} alt="rocket logo" />
        <p>For Indian Users Only</p>
      </div>
      <h1>Start posting anonymously where no one will judge.</h1>
      <p>Welcome to Stranger discussion forum</p>
      <Link to={"sign-up"} className="signUpBtn signBtn" href="/signUp">
        Create Your Account{" "}
        <img className="signUpImg" src={rightArrow} alt="" />
      </Link>
      <p>
        Already have account?{" "}
        <Link to={"/sign-in"} href="/login" className="loginBtn linkBtnSign">
          Login
        </Link>
      </p>
    </div>
  );
}
