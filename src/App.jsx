import React, {useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import NotFound from './NotFound'
import ProductList from './ProductList'
import ViewDetails from './ViewDetails'
import Cart from './Cart'
function App() {
  const getSavedCartCount = localStorage.getItem("my-cart" || "{}");
  const savedCartCount = JSON.parse(getSavedCartCount);
  const [cart, setCart]=useState({});
  console.log(cart);
      function handleAddtoCartCount(productId, count){
        const oldCount = cart[productId] || 0;
        const cartUpdate={...cart, [productId]: oldCount + count}
        setCart(cartUpdate);
        const cartCountStore = JSON.stringify(cartUpdate);
        localStorage.setItem("my-cart", cartCountStore);
      } 
  const totalCartCount = Object.keys(cart).reduce(function(prev, curr){
    return prev + cart[curr];
  },0);
return(
  <>
      <Header cartCount={totalCartCount}></Header>
      <Routes>
        <Route path="/" element={<ProductList/>} />
        <Route path="/viewDetails/:key/" element={<ViewDetails addToCart={handleAddtoCartCount}/>} />
        <Route path="/cart" element={<Cart cart={cart}></Cart>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer></Footer>
    </>
);
}

export default App;