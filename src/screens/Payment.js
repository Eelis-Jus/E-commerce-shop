import { use, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { inputCheck } from '../TextInputFunctions';

import './Payment.css'
/*

-include ability to backspace for all the inputs
-add space after 4 characters in card pan
*/ 
const Payment = () =>{

    const [email, Setemail]=useState("")
    const [firstname, Setfirstname]=useState("")    
    const [lastname, Setlastname]=useState("")    
    const [postnumber, Setpostnumber]=useState("")    //postnumber minlength is 5 because finnish postnumbers are length of 5
    const [homeaddress, Sethomeaddress]=useState("")    
    const [cardpan, Setcardpan] = useState(0)
    const [cardexpiration, Setcardexpiration] = useState("")
    const [cardcvv, Setcardcvv] = useState(0) //size of the card cvv is 4 because american express uses cvv that is the size of 4
    const [errortext, Seterrortext] = useState("")

    const blockOrder = useRef(true)

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
                    userid: null,
                    order_price: `${sessionStorage.getItem("price")}`,
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
        }
    }

    useEffect(()=>{
        if(cardexpiration.length==4){ //adding the '/' between the numbers in the expiration date 
            console.log("checking cardexpiration")
            console.log([cardexpiration.slice(0, pos), subStr, cardexpiration.slice(pos)].join(''))
            Setcardexpiration([cardexpiration.slice(0, pos), subStr, cardexpiration.slice(pos)].join(''))
        }
    })

return(
    <div>
        <form onSubmit={PlaceOrder()}>
            <ul className="paymentFields">
                <li>email</li>
                <input onChange={(e)=>Setemail(e.target.value)} type='email'></input>

                <li>first name</li>
                <input onChange={(e)=>Setfirstname(e.target.value)} minLength={2} onKeyDown={(event) => {
                if (/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>last name</li>
                <input onChange={(e)=>Setlastname(e.target.value)} minLength={2} onKeyDown={(event) => {
                if (/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>post number</li>
                <input onChange={(e)=>Setpostnumber(e.target.value)} minLength={5} onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>homeaddress</li>
                <input onChange={(e)=>Sethomeaddress(e.target.value)} minLength={4}></input>

                <li>card pan</li>
                <input onChange={(e)=>Setcardpan(e.target.value)} maxLength={16} onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li>card expiration</li>
                <input onChange={(e)=>Setcardexpiration(e.target.value)} maxLength={4} value={cardexpiration}></input>

                <li>card cvv</li>
                <input onChange={(e)=>Setcardcvv(e.target.value)}  maxLength={4} onKeyDown={(event) => {
                if (!/[0-9]/.test(event.key)) { 
                    event.preventDefault();
                }
                }}></input>

                <li><p style={{color: 'red'}}>{errortext}</p></li>

                <input type='submit' value='place order'></input>
            </ul>
        </form>
    </div>
);
};
export default Payment;