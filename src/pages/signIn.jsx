import React from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function signIn() {
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
  console.log("SIGNIN ACTION RUNNING");
  const formData = await request.formData();
  const email = formData.get("email");
  console.log(email);
  const password = formData.get("password");
  console.log(password);
  const auth = getAuth();

  try {
    // Sign in user
    await signInWithEmailAndPassword(auth, email, password);

    // Redirect to dashboard
    return redirect("/dashboard");
  } catch (error) {
    return { error: error.message }; // Handle errors
  }
}

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
