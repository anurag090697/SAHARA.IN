/** @format */

// import React, { useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
// import { saharaContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "../slice";

function ProductCard(props) {
  const dispatch = useDispatch();

  // const { user } = useContext(saharaContext);

  // const { cart, wishlist, productDetails } = useSelector(
  //   (state) => state.eCommerce
  // );

  // const userId = user.uid;

  function handleAddToCart(item) {
    dispatch(addToCart(item));
  }

  function addTolist(item) {
    dispatch(addToWishlist(item));
  }

  const navigate = useNavigate();

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[4];
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }

  function starRating(num) {
    let tm = [1, 2, 3, 4, 5];
    const stars = tm.map((ele, idx) => {
      return idx + 1 <= num ? (
        <FaStar className='text-amber-500' key={idx} />
      ) : (
        <FaRegStar className='text-white' key={idx} />
      );
    });
    return stars;
  }

  return (
    <div className='flex  gap-3 my-6 bg-gray-300 border-2 border-gray-400 rounded-lg overflow-hidden items-start justify-start'>
      <div>
        <img
          src={
            props.info.product_photo
              ? props.info.product_photo
              : "https://t3.ftcdn.net/jpg/05/88/70/78/360_F_588707868_7wOq88mVtkFKTnNPZqPFtemAJEFHlX4Z.jpg"
          }
          alt=''
          className='min-w-40 max-w-52'
        />
      </div>
      <div className='flex flex-col gap-2 items-start p-3'>
        <div>
          <h1
            className='text-3xl'
            onClick={() => navigate("/productdetailed/" + props.info.asin)}
          >
            {props.info.product_title}
          </h1>
          <button
            onClick={() =>
              speak(
                props.info.product_title
                  ? props.info.product_title
                  : "No description available"
              )
            }
          >
            <HiOutlineSpeakerWave />
          </button>
        </div>
        <div>
          {props.info.product_num_ratings ? (
            <div className='flex items-center gap-3'>
              {" "}
              <span>{props.info.product_star_rating}</span>
              <span className='flex'>
                {starRating(props.info.product_star_rating)}{" "}
                <FaChevronDown className='text-gray-600' />
              </span>
              <span>{props.info.product_num_ratings}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <p className='text-gray-500'>{props.info.sales_volume}</p>
        <div className='flex items-end gap-1'>
          <h3 className='text-2xl font-medium'>
            {props.info.product_minimum_offer_price}
          </h3>
          <h1 className=''>
            M.R.P{" "}
            <span className='line-through'>
              {props.info.product_original_price}
            </span>
          </h1>
          {/* <p>
            {Number(props.info.product_minimum_offer_price) +
              Number(props.info.product_original_price)}
          </p> */}
        </div>
        <div>
          {props.info.is_prime ? (
            <h3 className='flex items-end font-black text-sky-500'>
              <FaCheck className='text-amber-500 text-xl' />
              prime
            </h3>
          ) : (
            ""
          )}
        </div>
        <div>{props.info.delivery}</div>
        <div className='flex gap-6 items-center'>
          <button
            onClick={() => handleAddToCart(props.info)}
            className='rounded-xl text-gray-100 bg-lime-500 p-2 font-medium shadow-md shadow-lime-800 border-2 border-lime-600 hover:bg-lime-300 hover:text-rose-500 hover:shadow-none'
          >
            Add To Cart
          </button>
          <button
            onClick={() => addTolist(props.info)}
            className='rounded-xl text-gray-100 bg-rose-500 p-2 font-medium shadow-md shadow-rose-800 border-2 border-rose-600 hover:bg-rose-300 hover:text-sky-500 hover:shadow-none'
          >
            Add To Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
