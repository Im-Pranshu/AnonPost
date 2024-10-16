import React from "react";
import { Form, useNavigate } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

export default function signIn() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const email = event.target.name.value; // Get the email input value
    localStorage.setItem("userName", email); // Store the username in localStorage
    navigate("/dashboard"); // Redirect to the dashboard after login
  };

  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Enter Your Details</h2>
      <Form onSubmit={handleSubmit}>
        <input type="email" name="name" placeholder="Enter Email ID" required />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          required
        />
        <button type="submit" className="signUpContinue">
          Sign in <img src={rightArrow} alt="" />
        </button>
      </Form>
    </div>
  );
}
