import React,{useState, useEffect} from 'react';
import {getProductList} from './api';
import ProductDetail from './ProductDetail';
import SearchBar from './SearchBar';
import Dropdown from './Dropdown';
function ProductList(){
    const [data, setData] = useState([]);
    const [search, setSearch]=useState('');
    const [sort, setSort]=useState('default');
    useEffect(function(){
      const xyz=getProductList();
      xyz.then(function(response){
       setData(response);
       });
    },[])
    const newData=data.filter(function(item){
      return item.title.toLowerCase().indexOf(search.toLowerCase()) !=-1;
    })
  if(sort=='price-low-high'){
    newData.sort(function(a,b){
      return a.price-b.price;
    })
  }
  if(sort=='price-high-low'){
    newData.sort(function(a,b){
      return b.price-a.price;
    })
  }
    if(sort=='title'){
      newData.sort(function(a,b){
        return a.title.localeCompare(b.title);
      })
    }
  
    function handleChange(event){
      setSearch(event.target.value);
    }
    function handleSort(event){
      setSort(event.target.value);
    }

    return (
      <>
        <div className="bg-gray-200 md:py-8 min-h-screen">
          <div className="md:p-16 p-8 max-w-6xl mx-auto bg-white">
              <h1 className="font-light font-sans mb-2">Home / Shop</h1>
              <h1 className="text-2xl text-rose-400 font-sans mb-4">Shop</h1>
            <div className="flex gap-2 justify-start mb-8">
              <SearchBar search={search} handleChange={handleChange} sort={sort} handleSort={handleSort}></SearchBar>
              <Dropdown sort={sort} handleSort={handleSort}></Dropdown>
            </div>
        <div>
          <ProductDetail products={newData}></ProductDetail>
          {(newData.length==0) && <h1 className="text-3xl">No Products Found of Search item</h1>}
              </div>
            </div>
          </div>
      </>
    );
  }
export default ProductList;