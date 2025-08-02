//this is the screen view for the product, where you can see more info for the product (including reviews) and add it to your cart
import { useState, useEffect, useRef } from 'react';
import { useLocation,useNavigate } from 'react-router';
import { testString } from '../TextInputFunctions';
//import styled from 'styled-components';

import './Product_info.css';

/*
TODO:
-add place for the product reviews
-
*/

const ProductInfo = () =>{
    const [itemData, SetitemData] = useState([]);
    const [dataReceived, SetdataReceived] = useState(false) //this is used in html part, so that the page loads despite the fact that we don't have the data instantly upon going to this page
    const [keyName, SetkeyName] = useState('item: ')
    const itemadd = useRef(false)
    const isFirstRender = useRef(true)

    const location = useLocation()
    const productName = location.pathname.substring(location.pathname.lastIndexOf('/') + 1); //name of the product
    
    const navigate=useNavigate();

    useEffect(() => {
    if (isFirstRender.current){  
    const fetchItems = async() =>{
      try{
        const response = await fetch("http://localhost:3000/api/item/itemname?item_name="+productName)
        const data = await response.json();
        console.log("Response below:")
        SetitemData(data)
        SetdataReceived(true)
      }catch(error){
        console.log(error)
      }
    }

    fetchItems();
    }
    isFirstRender.current = false;

  // ---> StrictMode: The following is REQUIRED to reset/cleanup:

    return () => { isFirstRender.current = true };

    }, []); // ---> The `[]` is required, it won't work with `[myDependency]` etc.



const addToCart = async() =>{
 let keyCounter=0;
  while(itemadd.current==false){

    if(sessionStorage.getItem(keyName+keyCounter)==null){
      sessionStorage.setItem(keyName+keyCounter, itemData[0].item_name+" "+itemData[0].price);
      console.log("Current sessiostorage: "+sessionStorage.getItem(keyName+keyCounter))
      console.log("all keys: "+Object.values(sessionStorage));
      navigate("/");
      itemadd.current=true 

    }else{
      keyCounter++;
      console.log("current keyCounter: "+keyCounter)
  }

}
}


    return(
        <div className="ProductInfoPage">

          <div className="PicNamePrice">
            <ul>
              <li>
              <div className="PictureDescription">
                <ul>  

                  <img  className="ProductPicture" src={require(`../server/pictures/${productName}.jpg`)}></img>
                  <li className="ProductDescription">{dataReceived ? itemData[0].description : 'data not yet received'}</li>
                  <li className="ProductName">{dataReceived ? itemData[0].item_name : 'data not yet received'}</li>
                  <li className="ProductPrice">{dataReceived ? itemData[0].price : 'data not yet received'}€</li>
                  <li><button onClick={()=>addToCart()}>Add to cart</button></li>
                  
                </ul>
              </div>
              </li>
            <li>
            
            </li>
            </ul>
            <ul className='UserReviewsAndAddUserReviews'>
              <li>
            <div className="AddUserReview">
              <h1 className='UserName'>review adder username placeholder</h1>
              <textarea className='ReviewText'></textarea>
              <button>add review</button>
            </div>
            </li>

            <li>
            <div className="UserReviews">
              <h1 className='UserName'>username placeholder</h1>
              <text className='Review'>{testString}</text>
            </div>
            </li>
            </ul>
          </div>
        </div>
    );
};

export default ProductInfo;
