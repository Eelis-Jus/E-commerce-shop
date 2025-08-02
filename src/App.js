import TopBar from './TopBar';
import { Route,Routes } from 'react-router';
import Login from './screens/Login';
import ProductCard from './screens/Product_card';
import Register from './screens/Register';
import ProductInfo from './screens/Product_info';
import ShoppingCart from './screens/Shopping_cart';
import Payment from './screens/Payment';
import './App.css';
//https://www.youtube.com/watch?v=4_HWCPGaa18&ab_channel=CodeWithYousaf
function App() {

  return (
    <>
    <TopBar/>
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductCard/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="/productinfo/:item_name" element={<ProductInfo/>}/>
        <Route path="/shoppingcart" element={<ShoppingCart/>}/>
        <Route path="/payment" element={<Payment/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
