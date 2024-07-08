/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import arr from "./details.json";
import { GrNext, GrPrevious } from "react-icons/gr";
import { saharaContext } from "../App";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, productDetailed } from "../slice";

function ProductDetailed() {
  function handleAddToCart(item) {
    dispatch(addToCart(item));
  }

  function addTolist(item) {
    dispatch(addToWishlist(item));
  }

  const [moreinfo, setMoreinfo] = useState(false);
  // const [data, setData] = useState();
  const [imgarr, setImgArr] = useState([]);
  const [idx, setIdx] = useState(0);

  const { asin } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (asin) {
      dispatch(productDetailed({ asin }));
    }
  }, [dispatch, asin]);

  const { productDetails, status, error } = useSelector(
    (state) => state.eCommerce
  );
  // console.log(productDetails);

  useEffect(() => {
    if (productDetails) {
      setImgArr(productDetails.product_photos || []);
    }
  }, [productDetails]);

  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[4];
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
  function ratingData(obj) {
    let arr = [5, 4, 3, 2, 1];
    return (
      <>
        {arr.map((ele, idx) => {
          return (
            <div
              className='flex gap-2 items-center justify-start w-fit font-medium'
              key={idx}
            >
              {" "}
              <p className='text-xl'>{ele}</p> <span> Star</span>
              <div
                className='w-52 bg-gray-600 h-6 rounded-lg overflow-hidden'
                key={idx}
              >
                {" "}
                <div
                  className='h-6 bg-amber-500'
                  style={{ width: `${parseInt(obj[ele])}%` }}
                ></div>
              </div>
              <p>{obj[ele]}</p>
            </div>
          );
        })}
      </>
    );
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

  if (status === "loading") {
    return <div className='h-dvh text-center w-fill bg-violet-500 text-amber-600 font-medium text-3xl'>Loading...</div>;
  }

  if (status === "failed") {
    return <div className='h-dvh text-center w-fill bg-violet-500 text-amber-600 font-medium text-3xl'>Error: {error}</div>;
  }

  if (!productDetails) {
    return <div className='h-dvh text-center w-fill bg-violet-500 text-amber-600 font-medium text-3xl'>No product details available.</div>;
  }
  return (
    <div className='px-14 py-6'>
      <div className='flex items-center justify-between border-2 border-rose-500 rounded-lg overflow-hidden'>
        <div className='flex items-center gap-3 px-6 w-1/3 relative bg-amber-100 '>
          <button
            className={`bg-sky-200/50 p-2 left-0 top-1/2 text-4xl rounded-full absolute ${
              idx === 0 ? "text-rose-600" : "text-indigo-500"
            } hover:bg-sky-400`}
            onClick={() => setIdx((prev) => (prev > 0 ? prev - 1 : prev))}
          >
            <GrPrevious />
          </button>
          <img
            src={
              imgarr[idx] ||
              "https://thumbs.dreamstime.com/b/no-photo-available-icon-shadow-no-photo-available-icon-shadow-simple-vector-logo-268691695.jpg"
            }
            alt=''
          />
          <button
            className={`bg-sky-200/50 absolute right-0 top-1/2 p-2 text-4xl rounded-full ${
              idx === imgarr.length - 1 ? "text-rose-600" : "text-indigo-500"
            } hover:bg-sky-400`}
            onClick={() =>
              setIdx((prev) => (prev < imgarr.length - 1 ? prev + 1 : prev))
            }
          >
            <GrNext />
          </button>
        </div>
        <div className='p-4 bg-sky-200 w-2/3 '>
          <div className='flex flex-col gap-4 items-start'>
            <h1 className='text-3xl'>{productDetails.product_title}</h1>
            {productDetails.is_amazon_choice && (
              <div className='text-white bg-amber-500 w-fit pr-4 pl-1 font-medium '>
                Sahara's <span className='text-lime-700'>Choice</span>
              </div>
            )}
            {productDetails.is_prime && (
              <h3 className='flex items-end font-black text-sky-500'>
                <FaCheck className='text-amber-500 text-xl' />
                prime
              </h3>
            )}
            <div>
              {productDetails.product_num_ratings ? (
                <div className='flex items-center gap-3 font-medium'>
                  {" "}
                  <span>{productDetails.product_star_rating}</span>
                  <span className={`flex items-center hover:${""}`}>
                    {starRating(productDetails.product_star_rating)}{" "}
                    <FaChevronDown className='text-gray-600' />
                  </span>
                  <span>{productDetails.product_num_ratings} Ratings</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr className='border-black w-2/3' />
            <div>
              <div className='flex gap-2 items-end'>
                <h1 className='text-2xl'>
                  Price-{productDetails.product_price}
                </h1>
                <p>
                  M.R.P.
                  <span className='line-through'>
                    {productDetails.product_original_price}
                  </span>
                </p>
              </div>
              <div>
                <p>Inclusive of all taxes</p>
                <p>{productDetails.sales_volume}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-6 items-center my-4'>
            <button
              onClick={() => handleAddToCart(productDetails)}
              className='rounded-xl text-gray-100 bg-lime-500 p-2 font-medium shadow-md shadow-lime-800 border-2 border-lime-600 hover:bg-lime-300 hover:text-rose-500 hover:shadow-none'
            >
              Add To Cart
            </button>
            <button
              onClick={() => addTolist(productDetails)}
              className='rounded-xl text-gray-100 bg-rose-500 p-2 font-medium shadow-md shadow-rose-800 border-2 border-rose-600 hover:bg-rose-300 hover:text-sky-500 hover:shadow-none'
            >
              Add To Wishlist
            </button>
          </div>
          <div className='relative border border-lime-500 p-2 rounded-lg'>
            <button
              className='absolute right-2 top-2 text-violet-800 text-xl'
              onClick={() =>
                speak(
                  productDetails.product_description
                    ? productDetails.product_description
                    : "No description available"
                )
              }
            >
              <HiOutlineSpeakerWave />
            </button>
            <h2 className='text-xl font-medium'>Product Description</h2>
            <p className='text-lime-800'>
              {productDetails.product_description}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap items-start gap-10 justify-around '>
        <div className='flex flex-col px-10 py-5 border-2 border-white rounded-lg w-full my-2 bg-white'>
          <h1 className='text-xl font-medium p-2 underline'>Product Details</h1>
          <dl className='grid grid-cols-2 gap-x-4 gap-y-2 w-fit  p-3'>
            {Object.entries(productDetails.product_details).map(
              ([key, value]) => (
                <React.Fragment key={key}>
                  <dt className='font-semibold'>{key}:</dt>
                  <dd>{value}</dd>
                </React.Fragment>
              )
            )}
          </dl>
          <div className='p-2 '>
            {" "}
            <h2 className='text-xl font-medium p-2 underline'>About product</h2>
            <ul className='list-disc pl-6 space-y-2'>
              {productDetails.about_product.map((ele, idx) => {
                return <li key={idx}>{ele}</li>;
              })}
            </ul>
          </div>
          <div>
            <button
              className={`text-sky-500 ${moreinfo ? "hidden" : ""}`}
              onClick={() => setMoreinfo(true)}
            >
              View Detailed Information{" "}
            </button>
            <dl
              className={`grid grid-cols-2 gap-x-4 gap-y-2 w-fit p-3 ${
                moreinfo ? "" : "hidden"
              }`}
            >
              {Object.entries(productDetails.product_information).map(
                ([key, value]) => (
                  <React.Fragment key={key}>
                    <dt className='font-semibold'>{key}:</dt>
                    <dd>{value}</dd>
                  </React.Fragment>
                )
              )}
              <button
                className='text-red-600 self-start'
                onClick={() => setMoreinfo(false)}
              >
                hide
              </button>
            </dl>
          </div>
          <div className='w-fit flex flex-col gap-3 border-2 border-rose-200 bg-rose-100 p-3 rounded-lg shadow-lg shadow-rose-800 my-10'>
            <h1 className='text-xl font-medium'>Customer reviews</h1>
            <div>
              {productDetails.product_num_ratings ? (
                <div className='flex items-center gap-3 font-medium'>
                  {" "}
                  <span className={`flex items-center hover:${""}`}>
                    {starRating(productDetails.product_star_rating)}{" "}
                  </span>
                  <span>{productDetails.product_star_rating}</span>{" "}
                  <span>Out of 5</span>
                </div>
              ) : (
                ""
              )}
            </div>
            {ratingData(productDetails.rating_distribution)}
          </div>
        </div>
        {/* 
        <div className='flex items-center justify-around w-full bg-emerald-50 border-2 border-emerald-600 p-3  rounded-lg rounded-lg'>
          
         
        </div> */}
      </div>
    </div>
  );
}

export default ProductDetailed;
