import React,{useState,useEffect} from 'react';
import {getProductData} from './api';
import Loading from './Loading';
import CartRow from './CartRow';
import EmptyCart from './EmptyCart';
import Button from './Button';
import BackButton from './BackButton';

function Cart({cart, updateCart}) {
  const [data,setData]=useState([]);
  const [totalPrice,setTotalPrice]=useState(0); // total price of all products
  const [loading,setLoading]=useState(true); // loading state
  const [localCart,setLocalCart]=useState(cart); // local cart state (for updating cart)
  useEffect(function(){
    const promises = Object.keys(cart).map(function(productId){ // map is used to create an array of promises
      return getProductData(productId);// getProductData is a function that returns a promise
    });
    const allPromises = Promise.all(promises);//it takes an array of promises and returns a single promise
      allPromises.then(function(response){
      setData(response);
      setLoading(false);
    }
    )
  },[cart])
  function handleSubTotal(total){ //function to calculate subtotal
     return setTotalPrice(total); // set total price
  }

  function updateCartCheckout(id, count){ //function to update cart at checkout page
    const newCart = {...cart}; // copy cart
    newCart[id] = count; // update cart with updation of number of products at checkout page
    setLocalCart(newCart); // set local cart
   
  }
  function handleUpdateCartButton(){ //function to update cart onCick of update button
    updateCart(localCart);  // update cart
  }
  
  if(Object.keys(cart).length === 0 ){
    return <EmptyCart></EmptyCart>
  }
  if(loading) {return <Loading></Loading>}

  return (
    <>
      <div className="bg-gray-200 md:py-8 min-h-screen">
        <div className="p-8 max-w-6xl mx-auto bg-white rounded">
   <BackButton to="/"></BackButton>
    <div>
      <table className="border w-full">
          <thead>
             <tr className="border bg-gray-300">
                <th className="p-2"></th>
                <th className="text-center p-2">Product</th>
                <th className="p-2"></th>
                <th className="p-2">Price</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">SubTotal</th>
               </tr>
             </thead>
             <tbody>
                {data.map(function(data){ //here map is used to create an array of cart rows 
              return <CartRow handleTotalPrice={handleSubTotal}
                       key={data.title}
                       thumbnail={data.thumbnail}
                       price={data.price}
                       noOfProduct={cart[data.id]}
                       title={data.title}
                       id={data.id}
                       cart={cart}
                       updateCart={updateCart}
                       updateCartCheckout={updateCartCheckout}
                       ></CartRow>
                  })}
             </tbody>
           </table>
           <div className="my-4 md:flex w-full gap-2">
           <input className="border p-1" placeholder="Coupon Code"></input>
             <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-1 rounded-md font-semibold mx-1">APPLY COUPON</button>
             <button onClick={handleUpdateCartButton} className="hover:bg-rose-500 bg-gray-400 text-white px-4 py-1 rounded-md font-semibold justify-self-end my-4 md:my-0">UPDATE CART</button>  
           </div>
    </div>
      <div className="border w-80 mb-8 self-end">
        <h3 className="p-2 text-xl border bg-gray-200">Cart Totals</h3>
        <div className="p-2">
          <h4 className="p-2 border-b">Subtotal<span className="px-8">{totalPrice}</span></h4>
          <h4 className="p-2 border-b mb-3">Total<span className="px-8">{totalPrice}</span></h4>
          <Button text="PROCEED TO CHECKOUT"></Button>
        </div>
      </div>
        </div>
      </div>
      </>
  );
}

export default Cart;