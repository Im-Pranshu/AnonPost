import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

export default function SignUpOtp() {
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    const user = auth.currentUser; // Get the current user
    console.log(user);

    const checkVerification = async () => {
      // If user is not logged in, try signing in with email and password from localStorage
      if (!user) {
        const email = localStorage.getItem("userEmail");
        console.log("User email - " + email);
        const password = localStorage.getItem("userPassword");
        console.log("User password - " + password);

        if (email && password) {
          try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsVerified(true); // Assuming email is verified after signing in
            localStorage.setItem("isVerified", true); // Store verification status
            // setErrorMessage("SignIn Successfull " + error.message);
          } catch (error) {
            setErrorMessage("Error signing in: " + error.message);
            console.log("Error Message of main if - " + errorMessage);
          }
        } else {
          setErrorMessage("User not authenticated. Please sign in."); // Handle user not authenticated
          // alert("Your email is not verified yet. Please check your inbox");
          console.log("Error Message of main else - " + errorMessage);
        }
        return;
      }

      // Reload user data to check email verification status
      await user.reload();
      console.log(user.emailVerified);
      if (user.emailVerified) {
        // alert("Your email is not verified yet. Please check your inbox");
        setIsVerified(true);
        localStorage.setItem("isVerified", true); // Store verification status
        console.log("await if - Email has been verified by user");
      } else {
        setErrorMessage("Please verify your email address.");
        console.log("Error Message of await reload else - " + errorMessage);
      }
    };

    checkVerification();
    // console.log(isVerified);
  }, []);

  // Function to navigate to the Account Created page
  const handleContinue = () => {
    console.log(isVerified);
    if (isVerified) {
      navigate("/account-created"); // Navigate only if verified
      console.log("Error Message of handleConntinue if - " + errorMessage);
    } else {
      setErrorMessage(
        "Your email is not verified yet. Please check your inbox."
      );

      console.log("Error Message of handleContinue else - " + errorMessage);
    }
  };

  return (
    <div className="signUp otp">
      <img src={rocket} alt="" />
      <h2>Verify Email Id</h2>
      <p>
        We have sent a verification link to your email. Please verify your email
        to continue.
      </p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <button className="signUpContinue" onClick={handleContinue}>
        Continue <img src={rightArrow} alt="" />
      </button>
    </div>
  );
}
