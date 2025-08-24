import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, createBrowserRouter, RouterProvider, BrowserRouter } from "react-router"
import TopBar from './TopBar';
import Login from './screens/Login';
import ProductCard from './screens/Product_card';
import Register from './screens/Register';
import ProductInfo from './screens/Product_info';
import { CookiesProvider } from 'react-cookie';

//https://www.youtube.com/watch?v=SLfhMt5OUPI


/*
const router = createBrowserRouter([
      <TopBar/>,
{
  path:'/',
  element: <ProductCard/>
},
{
  path:'/login',
  element: <Login/>,
},
{
path:'/register',
element: <Register/>
},
{
  path:'/productinfo/:item_name',
  element: <ProductInfo/>
}
])
*/





/*
{
  path:'/productinfo',
  element: <ProductInfo/>
}
  <React.StrictMode>
    <App />
  </React.StrictMode>
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
