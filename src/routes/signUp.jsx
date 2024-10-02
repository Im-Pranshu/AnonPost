import React from 'react'
import {Form,Link} from "react-router-dom";
import rocket from "../assets/rocket.png"
import rightArrow from "../assets/right-arrow.png"

export default function signUp() {
  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Create Your Account</h2>
      <Form>
        <input type="text" name="" id="" placeholder='Enter Your Name'/>
        <input type="text" name="" id="" placeholder='Enter Email ID'/>
        <Link to={"/sign-up-otp"} className='signUpContinue' >Continue <img src={rightArrow} alt="" /></Link>
      </Form>
    </div>
  )
}
