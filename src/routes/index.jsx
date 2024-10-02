import React from 'react'
import { Link } from 'react-router-dom';
import rocket from "../assets/rocket.png";
import rightArrow from "../assets/right-arrow.png";

export default function index() {
  return (
    <div className="index">
        <div className='rocketDiv'>
            <img src={rocket} alt="rocket logo" />
            <p>For Indian Users Only</p>
        </div>
        <h1>Start posting anonymously where no one will judge.</h1>
        <p>Welcome to Stranger discussion forum</p>
        <Link to={"sign-up"} className='signUpBtn' href="/signUp" >Create Your Account <img className='signUpImg' src={rightArrow} alt="" /></Link>
        <p>Already have account? <Link to={"/sign-in"} href='/login' className='loginBtn'>Login</Link></p>
    </div>
  )
}
