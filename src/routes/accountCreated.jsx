import React from "react";
import { Link, Navigate } from "react-router-dom";
import success from "../assets/success.png";
import rightArrow from "../assets/right-arrow.png";

export default function accountCreated() {
  const isVerified = localStorage.getItem("isVerified");

  if (!isVerified) {
    // If not verified, redirect to sign-up OTP page
    return <Navigate to="/sign-up-otp" />;
  }

  return (
    <div className="signUp actCreated">
      <img src={success} alt="" />
      <h2>Account Created Successfully</h2>
      <Link to={"/dashboard"} className="signUpContinue">
        Create Your First Post <img src={rightArrow} alt="" />
      </Link>
    </div>
  );
}
