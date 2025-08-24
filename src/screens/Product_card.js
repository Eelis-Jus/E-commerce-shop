import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import './Product_card.css';
import { CookiesProvider } from 'react-cookie';

const ProductCard = () => {

  const [itemData, SetitemData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async() =>{
      try{
        const response = await fetch("http://localhost:3000/api/item") //here we fetch items so that we can display them on frontpage
        const data = await response.json();
        SetitemData(data)
      }catch(error){
        console.log(error)
      }
    }
    fetchItems();
  },[])

 
    return(
      <ul className="ProductCard_List">
        {itemData.map((todoItem, index) => (
          <div className="ProductCard" onClick={() => navigate('/productinfo/'+todoItem.item_name)}>
          <li key={index}>
            <div className='ProductPhotoBackground'>
            <img className="ProductPhoto" src={require(`../server/pictures/${todoItem.item_name}.jpg`)}></img> 
            </div>
            <h2 className="ProductName">{todoItem.item_name}</h2>
            <p className="ProductPrice">{todoItem.price}€</p>
          </li>
        </div>
        ))}
      </ul>
    );
};
export default ProductCard;