/** @format */

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arr from "./details.json";
import { GrNext, GrPrevious } from "react-icons/gr";
import { saharaContext } from "../App";
import { FaCheck } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

function ProductDetailed() {
  const { cart, setCart } = useContext(saharaContext);
  const { asin } = useParams();
  const [moreinfo, setMoreinfo] = useState(false);
  const [data, setData] = useState(null);
  const [imgarr, setImgArr] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      setData(arr.data);
      setImgArr(arr.data.product_photos || []);
    }, 500);
  }, []);

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

  if (!data || imgarr.length === 0) {
    return <div>Loading......</div>;
  }

  return (
    <div className='px-14 py-6'>
      <div className='flex items-start justify-between border-2 border-rose-500 rounded-lg overflow-hidden'>
        <div className='flex items-center gap-3 px-6 w-1/3 relative bg-amber-100'>
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
            <h1 className='text-3xl'>{data.product_title}</h1>
            {data.is_amazon_choice && (
              <div className='text-white bg-amber-500 w-fit pr-4 pl-1 font-medium '>
                Sahara's <span className='text-lime-700'>Choice</span>
              </div>
            )}
            {data.is_prime && (
              <h3 className='flex items-end font-black text-sky-500'>
                <FaCheck className='text-amber-500 text-xl' />
                prime
              </h3>
            )}
            <div>
              {data.product_num_ratings ? (
                <div className='flex items-center gap-3 font-medium'>
                  {" "}
                  <span>{data.product_star_rating}</span>
                  <span className={`flex items-center hover:${""}`}>
                    {starRating(data.product_star_rating)}{" "}
                    <FaChevronDown className='text-gray-600' />
                  </span>
                  <span>{data.product_num_ratings} Ratings</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr className='border-black w-2/3' />
            <div>
              <div className='flex gap-2 items-end'>
                <h1 className='text-2xl'>Price-{data.product_price}</h1>
                <p>
                  M.R.P.
                  <span className='line-through'>{data.product_price_max}</span>
                </p>
              </div>
              <div>
                <p>Inclusive of all taxes</p>
                <p>{data.sales_volume}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-6 items-center my-4'>
            <button className='rounded-xl text-gray-100 bg-lime-500 p-2 font-medium shadow-md shadow-lime-800 border-2 border-lime-600 hover:bg-lime-300 hover:text-rose-500 hover:shadow-none'>
              Add To Cart
            </button>
            <button className='rounded-xl text-gray-100 bg-rose-500 p-2 font-medium shadow-md shadow-rose-800 border-2 border-rose-600 hover:bg-rose-300 hover:text-sky-500 hover:shadow-none'>
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col px-10 py-5 border-2 border-white rounded-lg w-1/2 my-2 bg-white'>
        <h1 className='text-xl font-medium p-2 underline'>Product Details</h1>
        <dl className='grid grid-cols-2 gap-x-4 gap-y-2 w-fit  p-3'>
          {Object.entries(data.product_details).map(([key, value]) => (
            <React.Fragment key={key}>
              <dt className='font-semibold'>{key}:</dt>
              <dd>{value}</dd>
            </React.Fragment>
          ))}
        </dl>
        <div className='p-2 '>
          {" "}
          <h2 className='text-xl font-medium p-2 underline'>About product</h2>
          <ul className='list-disc pl-6 space-y-2'>
            {data.about_product.map((ele, idx) => {
              return <li key={idx}>{ele}</li>;
            })}
          </ul>
        </div>
        <div>
          <button className={`text-sky-500 `} onClick={() => setMoreinfo(true)}>
            View Detailed Information{" "}
          </button>
          <dl
            className={`grid grid-cols-2 gap-x-4 gap-y-2 w-fit p-3 ${
              moreinfo ? "" : "hidden"
            }`}
          >
            {Object.entries(data.product_information).map(([key, value]) => (
              <React.Fragment key={key}>
                <dt className='font-semibold'>{key}:</dt>
                <dd>{value}</dd>
              </React.Fragment>
            ))}
            <button
              className='text-red-600 self-start'
              onClick={() => setMoreinfo(false)}
            >
              hide
            </button>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailed;
