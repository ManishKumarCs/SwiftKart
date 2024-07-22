import React from 'react';
import {Link} from 'react-router-dom'
function Product(data) {
  return (
    <div className="py-2 px-6 flex flex-col shadow-2xl shadow-gray-500 hover:scale-105 md:h-96 max-w-30">
      <img className="max-w-52 object-cover" src={data.thumbnail} />
      <div className="flex flex-col h-full gap-auto">
        <div className="text-gray-400">{data.category}</div>
        <h1 className="font-semibold">{data.title}</h1>
        <img className="w-20" src="https://t4.ftcdn.net/jpg/02/48/25/71/360_F_248257108_7tdPJLNbS3NG3APuozsORP54BTlmUvUS.jpg"/>
        <h3 className="font-semibold">Price: Rs.{data.price}</h3>
        <Link to={"/viewDetails/"+data.id} className="hover:bg-rose-500 hover:text-white px-4 py-1 rounded my-2 border text-center">ViewDetails</Link>
      
      </div>
    </div>
  );
}

export default Product;




