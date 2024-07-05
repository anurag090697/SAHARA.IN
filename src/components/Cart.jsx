/** @format */

// import React, { useContext } from "react";
// import { saharaContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slice";

function Cart() {
  const { cart } = useSelector((state) => state.eCommerce);
  const dispatch = useDispatch();

  const removeItem = (asin) => {
    dispatch(removeFromCart(asin));
  };
  // console.log(cart);

  const discount = (a, b) => {
    let x = parseFloat(a.replace("₹", ""));
    let y = parseFloat(b.replace("₹", ""));
    // console.log(typeof(x))
    return Math.ceil(x - y);
  };
  return (
    <div className='bg-lime-200 py-5 px-20 '>
      <h1 className='text-3xl font-medium text-center bg-sky-300 rounded-lg border-2 border-gray-300 shadow-sky-800 shadow-lg'>
        CART
      </h1>

      <div className='flex flex-col py-10 gap-10'>
        {cart.length > 0 ? (
          cart.map((ele, idx) => {
            return (
              <div
                key={idx}
                className='w-2/3 bg-gray-50 p-4 rounded-xl border-2 border-indigo-400 flex gap-4 items-center '
              >
                <img src={ele.photo} alt='' className='w-40' />
                <div className='font-medium text-xl text-emerald-800 flex flex-col gap-3 items-start'>
                  <h2 className='text-rose-500'>{ele.title}</h2>
                  <h3>Offer Price- {ele.price}</h3>
                  <h3>
                    Total Dicount- Rs. {discount(ele.original_price, ele.price)}
                  </h3>
                  <p className='text-blue-500'>{ele.delivery}</p>
                  <button
                    className='bg-amber-500 p-2 rounded-xl border-2 border-amber-700 shadow-md shadow-amber-800 hover:shadow-none hover:text-rose-600 hover:bg-sky-300'
                    onClick={() => removeItem(ele.asin)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className='min-h-96 flex items-center justify-center font-bold text-3xl text-rose-500 '>
            NOTHING TO SEE HERE YET.....
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
