import React from "react";
import {
  Link,
  Form,
  useActionData,
  redirect,
  useNavigation,
} from "react-router-dom";
import rocket from "../assets/rocket.png";
import Button from "../components/Button";

// firebase account creation
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile, // Added for updating user profile with display name
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore import
import { db } from "../firebaseConfig"; // Firestore DB

export default function SignUp() {
  const actionData = useActionData(); // Get data or errors returned from the action

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Create Your Account</h2>
      <Form method="post">
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

        <Button
          content={"Sign up"}
          clickStatus={isSubmitting}
          customClasses={"logBtn"}
        />

        {actionData && <p className="error">{actionData.error}</p>}

        <p>
          Already registered?{" "}
          <Link className="linkBtn" to={"/sign-in"}>
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  localStorage.setItem("userName", name); // for displaying in account profile

  const auth = getAuth();

  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Update Firebase user's profile with the display name
    await updateProfile(user, {
      displayName: name, // Storing user's name in Firebase Auth profile
    });

    // Send email verification with a custom URL
    await sendEmailVerification(user, {
      url: "http://localhost:5173/sign-in", // Customize this URL for your verification page
      handleCodeInApp: true, // Ensures the app handles the verification
    });

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: new Date(),
    });

    // Redirect to OTP verification page
    return redirect("/verify-email");
  } catch (error) {
    // Return the error message to be handled on the frontend
    return { error: error.message };
  }
}
