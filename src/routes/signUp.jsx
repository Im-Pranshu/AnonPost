import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

// firebase account creation
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore import
import { db } from "../firebaseConfig"; // Firestore DB

export default function signUp() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Error handling

  const handleSignUp = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const auth = getAuth();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      // Store email and password in localStorage temporarily for OTP validation
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      // Navigate to OTP verification page
      navigate("/sign-up-otp");
    } catch (error) {
      setErrorMessage(error.message); // Handle errors

      console.log(errorMessage);
    }
  };

  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Create Your Account</h2>
      <Form onSubmit={handleSignUp}>
        <input type="text" name="name" placeholder="Enter Your Name" required />
        <input
          type="email"
          name="email"
          placeholder="Enter Email ID"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
        />
        <button type="submit" className="signUpContinue">
          Continue <img src={rightArrow} alt="" />
        </button>
      </Form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
}
