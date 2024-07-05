/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, addToCart } from "../slice";
import { useNavigate } from "react-router-dom";

function Wishlisht() {
  const { wishlist } = useSelector((state) => state.eCommerce);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelremove = (item) => {
    dispatch(addToWishlist(item));
  };

  const discount = (a, b) => {
    let x = parseFloat(a.replace("₹", ""));
    let y = parseFloat(b.replace("₹", ""));
    // console.log(x, y);
    return Math.ceil(x - y);
  };

  return (
    <div className='bg-orange-100 py-5 px-20 '>
      <h1 className='text-3xl font-medium text-center bg-pink-300 text-blue-600 rounded-lg border-2 border-gray-300 shadow-rose-800 shadow-lg'>
        WISHLIST
      </h1>
      <div className='flex flex-wrap gap-20 my-12 items-center justify-center'>
        {wishlist.length > 0 ? (
          wishlist.map((ele, idx) => {
            return (
              <div
                className='w-60 flex flex-col items-center justify-center rounded-xl bg-pink-200 overflow-hidden border-2 border-orange-800 shadow-lg shadow-gray-600 text-emerald-600'
                key={idx}
              >
                <img src={ele.photo} alt='' />
                <div className='font-medium p-2 text-center'>
                  <h2
                    className='text-sky-700 underline'
                    onClick={() => navigate("/productdetailed/" + ele.asin)}
                  >
                    {ele.title}{" "}
                  </h2>
                  <h2>Price- {ele.price}</h2>
                  <h3>
                    Total Dicount- Rs. {discount(ele.original_price, ele.price)}
                  </h3>
                </div>
                <button
                  className=' mb-3 p-2 bg-amber-400 text-rose-600 rounded-lg border-2 border-orange-500 font-bold shadow-lg shadow-amber-700 hover:shadow-none hover:bg-emerald-100'
                  onClick={() => handelremove(ele)}
                >
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <div className='min-h-96 flex items-center justify-center font-bold text-3xl text-fuchsia-600'>
            {" "}
            NOTHING TO SEE HERE
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlisht;
