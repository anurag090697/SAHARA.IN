/** @format */

// import React, { useContext } from "react";
// import { saharaContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart } = useSelector((state) => state.eCommerce);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItem = (asin) => {
    dispatch(removeFromCart(asin));
  };
  // console.log(cart);

  const discount = (a, b) => {
    let x = a.replace("₹", "");
    x = parseFloat(x.replace(",", ""));
    let y = b.replace("₹", "");
    y = parseFloat(y.replace(",", ""));
    // console.log(typeof(x))
    return Math.ceil(x - y);
  };

  const totaldiscount = (arr) => {
    let total = 0;
    let discount = 0;
    arr.forEach((ele, idx) => {
      let tm1 = ele.price;
      let tm2 = ele.original_price;
      tm1 = tm1.replace(",", "");
      tm2 = tm2.replace(",", "");
      let x = parseFloat(tm1.replace("₹", ""));
      let y = parseFloat(tm2.replace("₹", ""));
      total += x;
      discount += y;
    });
    return (
      <>
        <p>Total Discount- Rs. {discount - total}</p> <hr />{" "}
        <p>Total - Rs. {total}</p>
      </>
    );
  };
  return (
    <div className='bg-lime-200 py-5 px-20 '>
      <h1 className='text-3xl font-medium text-center bg-sky-300 rounded-lg border-2 border-gray-300 shadow-sky-800 shadow-lg'>
        CART
      </h1>

      <div className='flex flex-col py-10 gap-10 relative '>
        {cart.length > 0 ? (
          cart.map((ele, idx) => {
            return (
              <div
                key={idx}
                className='w-7/12 bg-gray-50 p-4 rounded-xl border-2 border-indigo-400 flex gap-4 items-center shadow-lg shadow-lime-900'
              >
                <img src={ele.photo} alt='' className='w-40' />
                <div className='font-medium text-xl text-emerald-800 flex flex-col gap-3 items-start'>
                  <h2 className='text-rose-500'>{ele.title}</h2>
                  <h3>Offer Price- {ele.price}</h3>
                  <h3>
                    Total Dicount- Rs. {discount(ele.original_price, ele.price)}
                  </h3>
                  <p className='text-blue-500'>{ele.delivery}</p>
                  <p> Quantity- {ele.quantity}</p>
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
        {cart.length > 0 ? (
          <div className='bg-white p-3 rounded-xl w-1/3 absolute top-10 right-0 border-2 border-emerald-800 shadow-lg shadow-lime-900'>
            {cart.length ? (
              <>
                {cart.map((ele, idx) => {
                  return (
                    <div key={idx} className='bg-white p-3 rounded-xl'>
                      <p>{ele.title}</p>{" "}
                      <p className='bg-gray-300'>Price- {ele.price}</p>{" "}
                      <p> Quantity- {ele.quantity}</p>
                      <hr className='my-2 border-black' />
                    </div>
                  );
                })}
              </>
            ) : (
              <p></p>
            )}
            <div className='bg-gray-200 p-2 font-medium flex items-center justify-between'>
              {totaldiscount(cart)}
            </div>
            <button onClick={() => navigate('/placeorder')} className='bg-sky-300 p-2 my-3 mx-2 rounded-lg border-2 border-sky-700 font-medium shadow-md shadow-sky-800 text-emerald-800 hover:bg-sky-100 hover:shadow-none'>
              Place Order
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Cart;
