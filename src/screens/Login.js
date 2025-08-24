import React, { useEffect, useState } from 'react';
import { Link, useNavigate, } from "react-router"
import Cookies from "universal-cookie"
import {jwtDecode} from "jwt-decode"

import './Login.css';
//import { response } from '../server/server';

const Login = () => {

  const [userEmail, SetuserEmail] = useState("")
  const [password, Setpassword] = useState("")
  const [checkpassword, Setcheckpassword] = useState([""])
  const [json, Setjson] = useState([])
  const [errortext, Seterrortext] = useState("")  //possible errortext for the user
  const [passwordRetrieved, SetpasswordRetrieved] = useState()  //possible errortext for the user

  const navigate = useNavigate();
  const cookies = new Cookies();


  useEffect(()=>{
    if(passwordRetrieved){
      Setcheckpassword(json)
        Seterrortext("Logging in...")
        getToken();
        navigate("/");
    }
    if(passwordRetrieved==false){
      Seterrortext("Email or password is incorrect or account doesn't exist");
    }
  })

  const getToken = async() =>{
    try {
      const response = await fetch("http://localhost:3000/api/jwt/make?user_email="+userEmail,{method: 'POST'});
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jwt = await response.json();
    cookies.set('accessToken',jwt.accessToken);
    }catch (error) {
      console.error('jwt request failed:', error);
    }
  }

  const handleSubmit = async () => { //for some reason default is password is incorrect and needs the second press. 
                                     //needs two presses of button to go back to the topbar site 
    console.log("sent password: "+password);
    console.log("sent email: "+userEmail);                                 
    try {
      const response = await fetch("http://localhost:3000/api/user/verifypassword?password="+password+"&email="+userEmail);
      const data = await response.json();
      console.log("response data: "+data)
    if(data=='Username and password is incorrect'){
      console.log("Username and password is incorrect")
      SetpasswordRetrieved(false)
    }else if (data=="Login Success"){
      console.log("login success")
      SetpasswordRetrieved(true)
    }else{
      console.log("something wrong")
    }
    }catch (error) {
      console.error('error: ', error);
    }
    
  }  

  return(
    <div className="LoginPage">

      <h1 className="head" style={{ color: 'black' }}>Log in</h1>

      <ul className="registerationFields">

      <li style={{ color: 'black' }}>email</li>
      <li><input onChange={(e)=>SetuserEmail(e.target.value)}  value={userEmail}/></li>

      <li style={{ color: 'black' }}>password</li>
      <li><input onChange={(e)=>Setpassword(e.target.value)} /></li>

      <li>
      <button onClick={()=>handleSubmit()}>Log In</button>
      </li>
        
      <li><text>{errortext}</text></li>
      <li><Link to="/register">Don't have an account? Click here to register</Link></li>      
      </ul>
          
    </div>
  );
  };
export default Login;