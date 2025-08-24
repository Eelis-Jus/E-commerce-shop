import React, { useEffect, useRef,useState  } from 'react';
import './TopBar.css';
import Site_logo from './pictures/Site_logo.jpg'
import { Link } from "react-router"
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie"
import { CiLogin,CiShoppingCart, CiLogout } from "react-icons/ci";

const TopBar = () => {
const [searchtext, Setsearchtext] = useState("")
const [searchItems, SetsearchItems] = useState([]);
const [loggedIn, Setloggedin] = useState(false);
//const loggedIn = useRef(false)
const navigate = useNavigate();

const cookies = new Cookies();


  useEffect(()=>{
    var myothercookie=cookies.get('accessToken')
   // console.log("myothercookie onko olemassa: "+myothercookie);
   // console.log("loggedin tila: "+loggedIn)
    if(myothercookie==undefined){
      Setloggedin(false);
    }else{
     // loggedIn.current=true;
      Setloggedin(true);
    }
  })

  const fetchData = (value) => {
    fetch("http://localhost:3000/api/item")
    .then((response)=> response.json())
    .then((json) =>{
      const results = json.filter((item)=>{ 
       // return item && item.item_name && item.item_name.toLowerCase().includes(value);
       if(value!=""){
        return item && item.item_name.toLowerCase().includes(value);
       }else{
        return null;
       }
      })
      console.log(results)
      SetsearchItems(results)
    })
  }  

  const removecookies = async() =>{
    cookies.remove('accessToken');
    console.log("cookies removed");
    //loggedIn.current=false;
    Setloggedin(false);
    console.log("cookietest "+cookies.get('accessToken'));
  }

  const handleChange = (value) => {
    Setsearchtext(value);
    fetchData(value)
  };

  const clickfunction = (itemname) =>{
    navigate('/productinfo/'+itemname);
    Setsearchtext("")
    console.log("searchtext is: "+searchtext)
  }

  return (
<div className='TopBar-part'>
  <nav className="TopBar">
    <div className="TopBar-left">
      <a href="/" className="logo">
      <img className="logo-img" style={{ width: 125, height: 65 }} src={Site_logo} />
      </a>
    </div>

  <div className="TopBar-center">
    <input className="searchBar"
      placeholder='search'
      value={searchtext} 
      onChange={(e)=> handleChange(e.target.value)}
      />
    <AiOutlineSearch style={{ color: 'black' }}/>
      <div className="SearchResultList">
        {searchItems.map((todoItem, index) => (
          <>
          <li key={index}> 
          <h2 onClick={() => clickfunction(todoItem.item_name)}>{todoItem.item_name}</h2>
          </li>
          </>
        ))}
      </div>
  </div>

  <div className="TopBar-right">
    <ul className="nav-right-links">
      <li>
       {loggedIn ? <CiLogout style={{color:'black'}} onClick={()=>removecookies()}/> : <CiLogin style={{ color: 'black' }}/>}  <Link to="/login" className='linktext' style={{ textDecoration: 'none' }}>{loggedIn ? '':'login'}</Link>
      </li> 
      <li>
        <CiShoppingCart style={{ color: 'black' }} onClick={() => navigate('/shoppingcart')}/>
      </li>
      </ul>
  </div>
  </nav>
</div>
);
};

export default TopBar;