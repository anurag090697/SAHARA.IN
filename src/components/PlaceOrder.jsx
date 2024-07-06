/** @format */

import React from "react";
import { clearCart } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const navigate = useNavigate();
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",

    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const { cart } = useSelector((state) => state.eCommerce);
  const dispatch = useDispatch();

  function clearcart() {
    e.preventDefault();
    // cart.forEach((element) => {
    //     dispatch(removeFromCart(element.asin));
    // });
    dispatch(clearCart());
  }
  return (
    <div className='bg-blue-900 p-10 text-white font-medium'>
      {cart.length > 0 ? (
        <form
          action=''
          onSubmit={() => clearcart()}
          className='flex flex-col items-center '
        >
          <h2 className='text-center text-2xl my-2 underline'>Address</h2>
          <div
            action=''
            className='flex flex-wrap gap-20 justify-around items-center text-black bg-gray-200 w-1/2 mx-auto p-4 rounded-xl shadow-lg shadow-gray-800'
          >
            <input
              required
              type='text'
              placeholder='Your full address'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
            <select
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
              required
            >
              {indianStates.map((ele, idx) => {
                return (
                  <option value={ele} key={idx}>
                    {ele}
                  </option>
                );
              })}
            </select>
            <input
              required
              type='text'
              placeholder='Your Pincode'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
            <input
              required
              type='text'
              placeholder='Your full name'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />

            <input
              required
              type='text'
              placeholder='City Name'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
            <input
              required
              type='phone'
              placeholder='Mobile Number'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
          </div>

          <hr className='w-1/2 mx-auto my-6' />
          <h2 className='text-center text-2xl my-2 underline'>Payment</h2>
          <div className='flex flex-wrap gap-20 justify-around items-center text-black bg-gray-200 w-1/2 mx-auto p-4 rounded-xl shadow-lg shadow-gray-800'>
            <input
              type='text'
              required
              placeholder='Name on card'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
            <input
              required
              type='tel'
              placeholder='xxxx xxxx xxxx xxxx'
              autoComplete='cc-number'
              inputMode='numeric'
              pattern='[0-9\s]{13-19}'
              maxLength={18}
              minLength={14}
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
            <input
              required
              type='text'
              placeholder='CVV'
              maxLength={3}
              min={3}
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
            />
            <input
              type='text'
              placeholder='Expiry Date'
              className='bg-sky-50 p-2 rounded-lg border-2 border-sky-700 outline-sky-400 text-center'
              required
            />
          </div>
          <button className='my-10 bg-lime-500 p-3 rounded-lg border-2 border-lime-800 text-xl hover:bg-lime-100 hover:text-lime-700 shadow-lg shadow-lime-800 hover:shadow-none hover:translate-y-1'>
            Submit
          </button>
        </form>
      ) : (
        <div className='py-52 text-center text-4xl'>
          <p>Your Order is placed successfully</p>
          <button
            className='my-3 text-emerald-500'
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default PlaceOrder;
