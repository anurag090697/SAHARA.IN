/** @format */

import React, { useEffect, useState } from "react";
// import axios from "axios";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
// import data from "./tempArr";
import { productSearch } from "../slice";
import { useParams } from "react-router-dom";

function SearchResults() {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  // const { cart } = useSelector((state) => state.eCommerce);

  useEffect(() => {
    dispatch(productSearch({ query: searchQuery, limit: "100" }));
  }, [dispatch]);

  // useEffect(() => {
  //   setProducts(data.data.products);
  // });

  const { searchResults, status, error } = useSelector(
    (state) => state.eCommerce
  );

  // console.log(cart);
  return (
    <div className='p-10 mx-auto'>
      {searchResults < 1 ? (
        <div className='h-dvh text-center w-fill bg-violet-500 text-amber-600 font-medium text-3xl'>LOADING......</div>
      ) : (
        searchResults.map((ele, index) => {
          return <ProductCard info={ele} key={index}></ProductCard>;
        })
      )}
    </div>
  );
}

export default SearchResults;
