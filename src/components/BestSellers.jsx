/** @format */

import React, { useEffect, useState } from "react";
// import deals from "./bestsellars.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productSearch } from "../slice";

function BestSellers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // let tm = todaydeals.data.products;
    // setData(tm);
    dispatch(productSearch({ query: 'best deals', limit: "100" }));
  }, []);
  
  const { searchResults, status, error } = useSelector(
    (state) => state.eCommerce
  );

  console.log(searchResults);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <div className="h-dvh text-center w-fill bg-sky-500 text-rose-600 font-medium text-3xl">Loading...</div>;
  }

  if (!searchResults) {
    return <div>No product details available.</div>;
  }

  return (
    <div className='p-10 text-center bg-lime-50'>
      <h1 className='bg-sky-500 font-medium text-3xl py-2 rounded-lg my-6 text-amber-300'>
        BEST SELLERS
      </h1>
      <div className='flex flex-wrap gap-8 items-center justify-center'>
        {" "}
        { searchResults.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className='w-56 rounded-lg overflow-hidden bg-white text-sky-900 shadow-md shadow-gray-400 font-medium'
                  onClick={() => navigate("/productdetailed/" + ele.asin)}
                >
                  <img src={ele.product_photo} alt='' />
                  <div className='flex items-center justify-between p-2'>
                    {" "}
                    <h2>Price{ele.product_price}</h2>
                    <h2>{ele.product_num_offers} {parseInt(ele.product_num_offersOffers) > 1 ? "Offers" : "Offer"}</h2>
                  </div>
                </div>
              );
            })
          }
      </div>
    </div>
  );
}

export default BestSellers;
