import React from 'react'
import {Form,Link} from 'react-router-dom'
import rocket from "../assets/rocket.png"
import rightArrow from "../assets/right-arrow.png"

export default function signIn() {
  return (
    <div className="signUp">
      <img src={rocket} alt="" />
      <h2>Enter Your Details</h2>
      <Form>
        <input type="email" name="name" id="" placeholder='Enter Email ID'/>
        <input type="password" name="password" id="" placeholder='Enter your Password'/>
        <Link to={"/dashboard"} className='signUpContinue' >Sign in <img src={rightArrow} alt="" /></Link>
      </Form>
    </div>
  )
}
