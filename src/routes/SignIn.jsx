import React from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignIn() {
  const actionError = useActionData();
  console.log(actionError);

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
        <button type="submit" className="signUpContinue">
          Sign in <img src={rightArrow} alt="" />
        </button>
      </Form>
      {actionError && <p className="error">{actionError.error}</p>}
    </div>
  );
}

export async function action({ request }) {
  // console.log("SIGNIN ACTION RUNNING");

  const formData = await request.formData();
  const email = formData.get("email");
  // console.log(email);

  const password = formData.get("password");
  // console.log(password);

  const auth = getAuth();

  let login; // store the status of login

  // this will access the name of user to display as account owner name
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userName = user.displayName;
      localStorage.setItem("userName", userName);
      console.log("UserName : ", userName);
    }
  });

  try {
    // Sign in user
    await signInWithEmailAndPassword(auth, email, password).then(() => {
      login = true;
      console.log("login authorized : ", login);
      localStorage.setItem("login", login);
    });

    // Redirect to dashboard
    return redirect("/dashboard");
  } catch (error) {
    return { error: error.message }; // Handle errors
  }
}

// old method of code
// const handleSignIn = async (event) => {
//   event.preventDefault();
//   const email = event.target.name.value;
//   const password = event.target.password.value;

//   const auth = getAuth();

//   try {
//     // Sign in user
//     await signInWithEmailAndPassword(auth, email, password);

//     // Redirect to dashboard
//     navigate("/dashboard");
//     console.log("Error Message getAuth try - " + errorMessage);
//   } catch (error) {
//     setErrorMessage(error.message); // Handle errors
//     console.log("Error Message getAuth catch - " + errorMessage);
//   }
// };
// const navigate = useNavigate();
