/** @format */

import React, { useEffect, useState } from "react";
// import deals from "./deals.json";
import { useDispatch, useSelector } from "react-redux";
import { productSearch } from "../slice";
import { useNavigate } from "react-router-dom";

function Deals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // let tm = todaydeals.data.products;
    // setData(tm);
    dispatch(productSearch({ query: 'top deals', limit: "100" }));
  }, []);

  const { searchResults, status, error } = useSelector(
    (state) => state.eCommerce
  );
  console.log(searchResults);
  if (status === "loading") {
    return <div className="h-86 text-center w-fill bg-black text-white font-medium text-3xl">Loading...</div>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!searchResults) {
    return <div>No product details available.</div>;
  }
  return (
    <div className='p-20 text-center bg-rose-50'>
      <h1 className='bg-violet-500 font-medium text-3xl py-2 rounded-lg my-6 text-lime-400'>
        GREATEST DEALS
      </h1>
      <div className='flex flex-wrap gap-10 justify-center items-center'>
        {searchResults.map((ele, idx) => {
          return (
            <div
              className='w-56 bg-gray-100 h-fit rounded-lg shadow-lg font-medium text-xl pb-3 shadow-gray-400'
              key={idx}
              onClick={() =>
                navigate("/productdetailed/" + ele.asin)
              }
            >
              <img src={ele.product_photo} alt='' />
              <div>
                <h2 className='text-emerald-700'>
                  Deal- {ele.product_price}
                </h2>
                <h2 className='text-red-700'>
                  Original Price-
                  <span className='line-through'>
                    {ele.product_original_price}
                  </span>
                </h2>
                <h3 className='text-rose-700 bg-emerald-500'>{ele.is_best_seller ? "BEST SELLER" : ""}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Deals;
