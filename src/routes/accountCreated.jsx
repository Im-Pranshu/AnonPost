import React from 'react'
import {Link} from "react-router-dom";
import success from "../assets/success.png"
import rightArrow from "../assets/right-arrow.png"

export default function accountCreated() {
  return (
    <div className="signUp actCreated">
        <img src={success} alt="" />
        <h2>Account Created Successfully</h2>
        <Link to={"/dashboard"} className='signUpContinue' >Create Your First Post <img src={rightArrow} alt="" /></Link>
    </div>
  )
}