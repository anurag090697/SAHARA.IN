/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import data from "./tempArr";

function SearchResults() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // getData();
    let tm = data.data.products;
    console.log(tm);
    setProducts(tm);
  }, []);
  return (
    <div className='p-10 mx-auto'>
      {products.length < 1 ? (
        <h1>LOADING......</h1>
      ) : (
        products.map((ele, index) => {
          return <ProductCard info={ele} key={index}></ProductCard>;
        })
      )}
    </div>
  );
}

export default SearchResults;
