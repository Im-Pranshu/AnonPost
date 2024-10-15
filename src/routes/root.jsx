import {React,useEffect} from 'react'
import hamburger from "../assets/hamburger.png"
import { 
  Link ,
  Outlet,
  useLoaderData,
} from 'react-router-dom';

export async function loader({ request, params }) {

  
  // console.log(request.url);
  
  // trim url to get the name of the path.
  function trimSubstring(str, substring) {
    return str.replace(substring, "");
  }
  const originalString = request.url;
  const trimmedString = trimSubstring(originalString, "http://localhost:5173/");
  // console.log("trimmedString",trimmedString); 

  if(trimmedString == "account-created" || trimmedString == "dashboard" || trimmedString == "dashboard/create-post"){
    return {
      name: "Welcome, Name"
    }
  }

  return {
    name: null
  };
}

export default function index() {

  const {name} = useLoaderData();
  console.log(name);


  return (
    <div className='rootRoute'>
      <nav className='navBar'>
        <div className='navLogo'>
          <img src={hamburger} alt="nav bar of the app" />
          <Link to="/" className='appName'>
            ANONYMOUS
          </Link>
        </div>
        <p className='appName userName'>{name}</p>
      </nav>
      <div className='outlet'>
        <Outlet/>
      </div>
    </div>
  )
}
