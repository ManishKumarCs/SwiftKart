import React, {useState} from 'react';
import {useEffect} from 'react';
import Button from './Button';
import { RxCrossCircled } from "react-icons/rx";

function CartRow({cart, id, thumbnail, title, price, noOfProduct, handleTotalPrice, updateCart, updateCartCheckout}){
  const [subtotal,setSubtotal]=useState(0);
   const [count,setCount]=useState(noOfProduct);
  
  useEffect(function(){
    handleTotalPrice(price*count); // total price of the product and pass it to cart page
    updateCartCheckout(id,count) // update cart checkout and pass it to cart page
  },[count])
  
  function handleCountValue(event){
    setCount(+event.target.value); 
    setSubtotal(price*count); 
  } 
  function handleRemoveCart(event){ // function to remove cart from checkout page
    const newCart = {...cart};
    delete newCart[event.currentTarget.getAttribute('id')]; // delete the product from the cart
    updateCart(newCart);
  }
 

  return( 

    <>
    <tr className="border-b-2">
      <td className="p-2"><button className="ml-2" onClick={handleRemoveCart} id={id}><RxCrossCircled className="text-3xl"/></button></td>
      <td className="text-center"><img className="w-24 px-2" src={thumbnail}/></td>
      <td className="text-rose-400 font-bold p-2">{title}</td>
      <td className="text-center p-2">{price}</td>
      <td className="text-center p-2">
        <input className="text-center border justify-self-center w-16 p-2" value={count} onChange={handleCountValue} type="number" />
      </td>
      <td className="text-center p-2">{price*count}</td>
    </tr>
    </>
  );
}
export default CartRow;