import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router"

import './Register.css';
import { characterlimiter } from '../TextInputFunctions';

/*
TODO: 
-include ability to backspace for all the inputs
-hash sensitive data(passwords, homeaddressess etc...)
-add space after 4 characters in card pan


*/

const Register = () => {
  const [userName, SetuserName] = useState("")  //Username
  const [userEmail, SetuserEmail] = useState("") //User email
  const [Password, SetPassword] = useState("")  //User password
  const [passwordAgain, SetpasswordAgain] = useState("")  //User password again, so that the user knows for sure their password
  const [homeaddress, Sethomeaddress] = useState("")  //user homeaddress, to collect more data and make the ordering easier (optional for the user)
  const [postnumber, Setpostnumber] = useState("")   //user postnumber, to collect more data and make the ordering easier (optional for the user)
  const [cardpan, Setcardpan] = useState("")   //user cardpan, to make the ordering easier (optional for the user)
  const [cardexpiration, Setcardexpiration] = useState("")   //user cardexiprationDate, to make the ordering easier (optional for the user)
  const [cardsecuritycode, Setcardsecuritycode] = useState("")   //user cardsecuritycode, to make the ordering easier (optional for the user)
  const [firstname, Setfirstname] = useState("")
  const [lastname, Setlastname] = useState("")
  const [errortext, Seterrortext] = useState("")  //possible errortext for the user

  const emailInuse = useRef(true)
  const usernameInuse = useRef(true)
  const isEqualsPasswords = useRef(false)  //check if the passwords match in the register form
  const EmailOrUsernameInUse = useRef(true) //this is used so that the checks(if statements) in useEffect are bit easier to read

  const cardpanSpaceAddPlaces=[4,8,12]

  let subStr='/';
  let pos=2;

  const navigate = useNavigate();

  const emailAtCheck = (email) =>{
    if(email.includes("@")){
      return true;
    }else{
      return false;
    }
  }


  useEffect(()=>{  
    if(cardexpiration.length==4){
      Setcardexpiration([cardexpiration.slice(0, pos), subStr, cardexpiration.slice(pos)].join(''))
    }
   
    if(cardpan.length==cardpanSpaceAddPlaces[0] ){
      let whitespace=' ';
      let position=4;
      Setcardpan([cardexpiration.slice(0, position), whitespace, cardexpiration.slice(position)].join(''))
    }
      
  })



  const loginfunc = async() =>{  //hash the password todo
  handleSubmit();    
  passwordAndEmailcheck();

  if(isEqualsPasswords.current==true && EmailOrUsernameInUse.current==false){
    const response = fetch("http://localhost:3000/api/user/adduser", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
                user_email: `${userEmail}`,
                username: `${userName}`,
                address: `${homeaddress}`,
                post_number: `${postnumber}`,
                card_pan: `${cardpan}`,
                card_exp_date: `${cardexpiration}`,
                card_security_code: `${cardsecuritycode}`,
                password: `${Password}`, 
                firstname: `${firstname}`,
                lastname: `${lastname}`,
      })
  }).then(response => response.json())
    .then(data => console.log(data+" http code: "+data.response ))
    .catch(error => console.error('POST request failed:', error));

  if (response?.ok) {
    console.log('Use the response here!');
  } else {
    console.log(`HTTP Response Code: ${response?.status}`)
  }

  Seterrortext("Registeration successful");
  navigate("/");
}

  }  



 const passwordAndEmailcheck = async() => {
  if(isEqualsPasswords.current==false && EmailOrUsernameInUse.current==true){      
    Seterrortext("username and/or email already in use and passwords do not match");     
   // buttonpressed.current=false
  }

  if(isEqualsPasswords.current==false && EmailOrUsernameInUse.current==false){
    Seterrortext("Passwords do not match");
  //  buttonpressed.current=false
  }  

  if(isEqualsPasswords.current==true && EmailOrUsernameInUse.current==true){
    Seterrortext("username and/or email already in use");
  //  buttonpressed.current=false
  }
};



  const nameCheck = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/usernamecheck?username="+userName);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonResponse = await response.json();
      console.log("namecheck stringify jsonresponse: "+JSON.stringify(jsonResponse))
      if(JSON.stringify(jsonResponse)==='[]'){
        usernameInuse.current=false
      }else{
        usernameInuse.current=true
      }

    }catch(error) {
      console.error('Username request failed:', error);
    }
  }  
  


  const emailCheck = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/emailcheck?email="+userEmail);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonResponse = await response.json();
      console.log("email stringify jsonresponse: "+JSON.stringify(jsonResponse))
      if(JSON.stringify(jsonResponse)==='[]'){
        emailInuse.current=false
      }else{
        emailInuse.current=true
      }

    }catch (error) {
      console.error('Email request failed:', error);
    }
  }  


const handleSubmit = async () => {
  let emailIncludesAt = emailAtCheck(userEmail);
  if(emailIncludesAt==true){ 
    nameCheck();
    emailCheck();
    if(usernameInuse.current==true || emailInuse.current==true){
      EmailOrUsernameInUse.current=true;
    }else{
      EmailOrUsernameInUse.current=false;
    }
    if(Password===passwordAgain){ //check if the passwords match on registeration
      isEqualsPasswords.current=true;  
    }else{
      isEqualsPasswords.current=false;
    }
  // buttonpressed.current=true;
  }else{
    Seterrortext("email must include @")
  }
}    

return(

  <div className="RegisterPage">
    <h1 className="head" style={{ color: 'black' }}>registeration</h1>
    
    <ul className="registerationFields">
    
    <li style={{ color: 'black' }}>firstname</li>
    <li><input onChange={(e)=>Setfirstname(e.target.value)}  value={firstname} onKeyDown={(event) => {
      if (/[0-9]/.test(event.key)) { 
        event.preventDefault();
      }
      }}/></li>

    <li style={{ color: 'black' }}>lastname</li>
    <li><input onChange={(e)=>Setlastname(e.target.value)}  value={lastname} onKeyDown={(event) => {
      if (/[0-9]/.test(event.key)) { 
        event.preventDefault();
      }
      }}/></li>


    <li style={{ color: 'black' }}>username</li>
    <li><input onChange={(e)=>SetuserName(e.target.value)}  value={userName}/></li>
    
    <li style={{ color: 'black' }}>user email</li>
    <li><input onChange={(e)=>SetuserEmail(e.target.value)}  value={userEmail} type="email"/></li>
    
    <li style={{ color: 'black' }}>password</li>
    <li><input onChange={(e)=>SetPassword(e.target.value)}  value={Password}/></li>
    
    <li style={{ color: 'black' }}>give password again</li>
    <li><input onChange={(e)=>SetpasswordAgain(e.target.value)}  value={passwordAgain}/></li>
    
    <li style={{ color: 'black' }}>fields below are optional:</li>
    
    <li style={{ color: 'black' }}>homeaddress</li>
    <li><input onChange={(e)=>Sethomeaddress(e.target.value)}  value={homeaddress}/></li>
    
    <li style={{ color: 'black' }}>postnumber</li>
    <li><input onChange={(e)=>Setpostnumber(e.target.value)}  value={postnumber} type='number' onWheel={(e) => e.target.blur()} class="number-to-text"/>
    </li>
    
    <li style={{ color: 'black' }}>card pan</li>
    <li><input  value={cardpan} onChange={(e)=>characterlimiter(e,16,Setcardpan)} maxLength={4} onWheel={(e) => e.target.blur()} class="number-to-text" 
    onKeyDown={(event) => {
      if (characterlimiter(event,16,Setcardpan)==true) { 
        event.preventDefault();
      }
      }}
    /></li>
    
    <li style={{ color: 'black' }}>card expiration</li>
    <li><input onChange={(e)=>Setcardexpiration(e.target.value)}  value={cardexpiration} maxLength={4} onKeyDown={(event) => {
      if (!/[0-9]/.test(event.key)) { 
        event.preventDefault();
      }
      }}/></li>
    
    <li style={{ color: 'black' }}>card security code</li>
    <li><input onChange={(e)=>Setcardsecuritycode(e.target.value)}  value={cardsecuritycode} maxLength={4}  onWheel={(e) => e.target.blur()} class="number-to-text"/>
    </li> 
              
    <li><button type="button" onClick={(e)=>loginfunc(e)}>register</button></li>
    <li><text style={{ color: 'red' }}>{errortext}</text></li>
    <li><Link to="/login">Already have an account? Click here to login</Link></li>
    </ul>
  </div>  
);
};
    export default Register;