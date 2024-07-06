/** @format */

import React, { useEffect, useState } from "react";
import todaydeals from "./todaydeals.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productSearch } from "../slice";

function TodayDeals() {
  // const [data, setData] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // let tm = todaydeals.data.products;
    // setData(tm);
    dispatch(productSearch({ query: "trending", limit: "100" }));
  }, []);

  const { searchResults, status, error } = useSelector(
    (state) => state.eCommerce
  );
  console.log(searchResults);
  if (status === "loading") {
    return (
      <div className='h-96 text-center w-fill bg-violet-500 text-amber-600 font-medium text-3xl'>
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!searchResults) {
    return <div>No product details available.</div>;
  }
  return (
    <div className='p-20 text-center bg-fuchsia-100'>
      <h1 className='bg-amber-400 font-medium text-3xl py-2 rounded-lg my-6 text-indigo-600'>
        Deals Today
      </h1>
      <div className='flex flex-wrap justify-center gap-10'>
        {" "}
        {searchResults.map((ele, idx) => {
          return (
            <div
              key={idx}
              className='w-60 rounded-lg overflow-hidden bg-white text-center shadow-lg shadow-gray-400 font-medium pb-2'
              onClick={() => navigate("/productdetailed/" + ele.asin)}
            >
              <img src={ele.product_photo} alt='' />
              <h3 className='text-indigo-500 p-2'>{ele.product_title}</h3>
              <h3 className='text-lime-600 underline p-2'>
                ONLY FOR - {ele.product_price}
              </h3>
              <h3 className='text-sky-500'>
                Total Rs-{" "}
                {parseInt(ele.product_original_price) -
                  parseInt(ele.product_price)}{" "}
                OFF
              </h3>
              <h3 className='text-rose-600'>
                {ele.product_star_rating}/5 Stars
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodayDeals;
