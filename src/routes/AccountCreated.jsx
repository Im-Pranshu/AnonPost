import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import success from "../assets/success.png";
import rightArrow from "../assets/right-arrow.png";

export default function AccountCreated() {
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
