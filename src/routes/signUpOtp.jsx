import React from 'react'
import {Form,Link} from "react-router-dom";
import rocket from "../assets/rocket.png"
import rightArrow from "../assets/right-arrow.png"

export default function signUpOtp() {
  return (
    <div className="signUp otp">
      <img src={rocket} alt="" />
      <h2>Create Your Account</h2>
      <p>Please verify your email ID to continue. 
      We have sent an OTP to this emailID</p>
      <Form>
        <input type="text" name="" id="" placeholder='Enter OTP'/>
        <Link to={"/account-created"} className='signUpContinue' >Continue <img src={rightArrow} alt="" /></Link>
      </Form>
    </div>
  )
}
