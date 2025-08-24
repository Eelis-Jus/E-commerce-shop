//this is the shopping cart file, here we map the items from sessionstorage
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router";


import './Shopping_cart.css';

const ShoppingCart = () =>{

const [cartItems, SetcartItems] = useState([]);
const [price, Setprice] = useState([]); //this array will save the individual prices of the items and will be used to set the whole price of the order
const [loadItems, SetloadItems] =useState(true)
const [wholeprice, Setwholeprice]=useState(0);
const [errortext, Seterrortext] = useState("");

const canOrder=useRef(false); //use this to allow/disallow the user to go to the payment
let isFirstRender = 0;


const navigate = useNavigate();

useEffect(()=>{
    console.log("current firstRender: "+isFirstRender)
    
    if(sessionStorage.getItem("orderprice")!=null){ //remove possible orderprice from sessionstorage, otherwise sessionstoragemapper might throw error
        sessionStorage.removeItem("orderprice")
    }
    if(sessionStorage.getItem("items")!=null){ //remove possible orderprice from sessionstorage, otherwise sessionstoragemapper might throw error
        sessionStorage.removeItem("items")
    }

    if(isFirstRender==1){
      //  console.log("executing sessionstoragemapper")
        sessionstoragemapper();
     //   console.log("executing pricecounter");
        let i=priceCounter();
        Setwholeprice(i);
        isFirstRender=isFirstRender+1;
    }
    isFirstRender=isFirstRender+1;
});

const sessionstoragemapper = () =>{
    for (let i=0; i<sessionStorage.length; i++){
        let curitem=sessionStorage.getItem("item: "+i);
        console.log("curitem: "+curitem)
        const myArray=curitem.split(" ");
        console.log("price: "+myArray[1]);
        console.log("item: "+myArray[0]);
        price.push(parseInt(myArray[1]));
        cartItems.push(myArray[0]);
        console.log("items: "+'{'+cartItems.toString()+'}');
        }
};

const toPayment = async () =>{

    if(cartItems.length!=0){ //check if user has something in his/hers cart and thus wheter to let them to proceed to payment
        canOrder.current=true;
    }

    if(canOrder.current==true){
        sessionStorage.setItem("orderprice", wholeprice);
        sessionStorage.setItem("items", cartItems);
        navigate('/payment');
    }else{
        Seterrortext("You need items in your cart in order to order");
    }

};

const priceCounter = () =>{
    let itemsprice=0;
    for(let i=0; i<price.length; i++){
        itemsprice=itemsprice+price[i];
        console.log("current itemprice: "+itemsprice)
    }
    return itemsprice;
};

return(
    <div className="ShoppingCart">
        {cartItems.map((todoItem, index) => (
        <>
            <li key={index}> 
                <h2 onClick={() => navigate('/productinfo/'+todoItem)}>
                {todoItem}
                <img className="itemphoto" src={require(`../server/pictures/${todoItem}.jpg`)}></img>
                </h2>
            </li>
        </>
        ))}    
        <li>price of the order {`${wholeprice}`}€</li>
        <li style={{color: 'red'}}>{errortext}</li>
        <button onClick={() => toPayment()}>proceed to pay</button>
    </div>
)

}

export default ShoppingCart;