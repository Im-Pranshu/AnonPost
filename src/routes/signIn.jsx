import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function signIn() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.name.value;
    const password = event.target.password.value;

    const auth = getAuth();

    try {
      // Sign in user
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message); // Handle errors
    }
  };

  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Enter Your Details</h2>
      <Form onSubmit={handleSignIn}>
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
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}
