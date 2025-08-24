import { Component, use, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { inputCheck } from '../TextInputFunctions';
import Cookies from "universal-cookie"
import './Payment.css'
import { jwtDecode } from 'jwt-decode';
/*

-include ability to backspace for all the inputs
-add space after 4 characters in card pan
-clear sessionstorage after order placed succesfully
-indicate to user that the order is placed succesfully
*/ 
const Payment = () =>{

    const cookies = new Cookies()


    const [userid, Setuserid]=useState(null)    
    const [email, Setemail]=useState("")
    const [firstname, Setfirstname]=useState("")    
    const [lastname, Setlastname]=useState("")    
    const [postnumber, Setpostnumber]=useState("")    //postnumber minlength is 5 because finnish postnumbers are length of 5
    const [homeaddress, Sethomeaddress]=useState("")    
    const [cardpan, Setcardpan] = useState(0)
    const [cardexpiration, Setcardexpiration] = useState("")
    const [cardcvv, Setcardcvv] = useState(0) //size of the card cvv is 4 because american express uses cvv that is the size of 4
    const [errortext, Seterrortext] = useState("")

    const [getuserdata, Setgetuserdata] = useState(0);

    const blockOrder = useRef(true)

    const userisin = useRef(false);    

    const navigate = useNavigate();

    

    //let token;
   // let useremail;
    let subStr='/';
    let pos=2;
   

 

    const checkemail = (userEmail) =>{
        if(userEmail.includes("@")){
            blockOrder.current=false;
        }else{
            blockOrder.current=true;
        }
    }

    const PlaceOrder = async() =>{
        checkemail(email);
        if(blockOrder.current==false){
            try{
                const response = fetch("http://localhost:3000/api/order/addorder", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: `${userid}`,
                    order_price: `${sessionStorage.getItem("orderprice")}`,
                    firstname: `${firstname}`,
                    lastname: `${lastname}`,
                    postnumber: `${postnumber}`,
                    homeaddress: `${homeaddress}`,
                    email: `${email}`,
                    items: `${sessionStorage.getItem("items")}`,
                })
                }).then(response => response.json())
                    .then(data => console.log(data+" http code: "+data.response ))
                    .catch(error => console.error('POST request failed:', error));
                if (response?.ok) {
                    console.log('Use the response here!');
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                }    
            }catch(error){
            }
            sessionStorage.clear();
            navigate("/");
        }
    }

    useEffect(()=>{
        if(getuserdata==0){
        const keksi=cookies.get('accessToken');
        if(keksi==undefined){
            Setgetuserdata(1);
        }else{
            Setgetuserdata(2);
            userisin.current=true;
        }
        }
        if(getuserdata==2){
           const token = cookies.get('accessToken');
           console.log('current accessToken: '+token);
           const user=jwtDecode(cookies.get('accessToken'));
           const useremail=user.email;
           console.log("current useremail: "+useremail);
           if(user==undefined){
               Setgetuserdata(1);
           }else{
               userisloggedin(token,useremail);
               Setgetuserdata(1);
            }
        }
        
        if(cardexpiration.length==4&&keksi==undefined){ //adding the '/' between the numbers in the expiration date if the cardexipiration isn't received from db
            console.log("checking cardexpiration")
            console.log([cardexpiration.slice(0, pos), subStr, cardexpiration.slice(pos)].join(''))
            Setcardexpiration([cardexpiration.slice(0, pos), subStr, cardexpiration.slice(pos)].join(''))
        }
            
    })


       const userisloggedin = async(token, useremail) =>{
        try{
            console.log("getting token: "+token);
            console.log("getting email: "+useremail);
            const headers = { 'Authorization': `Bearer ${token}`};
                const response = await fetch("http://localhost:3000/api/user/loggedinuserinfo?user_email="+useremail, { headers });
                if(response.status==403){
                    Seterrortext("your token expired, please log out and log in again or manually fill the info")
                }
                if(response.status==401){
                   Seterrortext("authorization error") 
                }
                console.log("get request done");
                const data = await response.json();
                console.log("data gotten: "+data[0]);
                Setemail(data[0].user_email);
                console.log("email set"+data[0].user_email);
                Setuserid(data[0].userid);
                console.log("userid set");
                Setfirstname(data[0].firstname);
                console.log("firstname set");
                Setlastname(data[0].lastname);
                console.log("lastname set");
                Sethomeaddress(data[0].address);
                console.log("homeaddress set");
                Setpostnumber(data[0].post_number);
                console.log("post number set")
                Setcardcvv(data[0].card_security_code);
                console.log("card security code set");
                Setcardpan(data[0].card_pan);
                console.log("cardpan set");
                Setcardexpiration(data[0].card_exp_date);
                console.log("card expdate set");
                if (response?.ok) {
                    console.log('Response: '+response);
                } else {
                    console.log(`HTTP Response Code: ${response?.status}`)
                }    
            }catch(error){
            }
    }




return(
    <div>
       
            <ul className="paymentFields">
                <li>email</li>
                <input onChange={(e)=>Setemail(e.target.value)} value={email} type='email'></input>

                <li>first name</li>
                <input onChange={(e)=>Setfirstname(e.target.value)} minLength={2} value={firstname} onKeyDown={(event) => {
                if (/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>last name</li>
                <input onChange={(e)=>Setlastname(e.target.value)} minLength={2}  value={lastname} onKeyDown={(event) => {
                if (/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>post number</li>
                <input onChange={(e)=>Setpostnumber(e.target.value)} minLength={5} value={postnumber} onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>homeaddress</li>
                <input onChange={(e)=>Sethomeaddress(e.target.value)} minLength={4} value={homeaddress}></input>

                <li>card pan</li>
                <input onChange={(e)=>Setcardpan(e.target.value)} maxLength={16} value={cardpan} onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>card expiration</li>
                <input onChange={(e)=>Setcardexpiration(e.target.value)} maxLength={4} value={cardexpiration}></input>

                <li>card cvv</li>
                <input onChange={(e)=>Setcardcvv(e.target.value)}  maxLength={4} value={cardcvv} onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li><p style={{color: 'red'}}>{errortext}</p></li>

                <button onClick={()=>PlaceOrder()}>place order</button>
            </ul>
       
    </div>
);
};
export default Payment;