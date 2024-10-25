import React, { useEffect } from "react";
import { Link, Form, useActionData, redirect } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignIn() {
  const actionError = useActionData();

  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Enter Your Details</h2>
      <Form method="POST">
        <input
          type="email"
          name="email"
          placeholder="Enter Email ID"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          required
        />
        <button type="submit" className="signUpContinue allBtn">
          Sign in <img src={rightArrow} alt="" />
        </button>
        <p>
          Not registered yet?{" "}
          <Link className="linkBtnSign" to={"/sign-up"}>
            SignUp
          </Link>
        </p>
      </Form>
      {actionError && <p className="error">{actionError.error}</p>}
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const auth = getAuth();

  // this will access the name of user to display as account owner name
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userName = user.displayName;
      localStorage.setItem("userName", userName);
    }
  });

  let login; // store the status of login
  try {
    // Sign in user
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      login = true;
      localStorage.setItem("login", login);
    });

    // Redirect to dashboard
    return redirect("/dashboard");
  } catch (error) {
    return { error: error.message }; // Handle errors
  }
}
