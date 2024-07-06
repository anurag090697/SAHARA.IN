/** @format */

import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase";
import { saharaContext } from "../App";
import { useSelector } from "react-redux";

function Header() {
  const { user, setUser } = useContext(saharaContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useSelector((state) => state.eCommerce);

  const [totalProds, setTotalprods] = useState();

  useEffect(() => {
    let tm = 0;

    cart.forEach((element) => {
      tm += element.quantity;
    });
    setTotalprods(tm);
    // console.log(cart, totalProds);
  }, [cart]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setUser(null);

      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  function SearchResults(e) {
    e.preventDefault();
    if (searchQuery.length < 4 || searchQuery === "")
      alert("Input too short..");
    else {
      navigate("/searchresults/" + searchQuery);
      setSearchQuery("");
    }
  }

  const logio = (
    <div className='flex gap-3 items-center font-medium text-xl'>
      {user?.displayName ? (
        <>
          {/* <p>Welcome</p> */}
          <p className='text-green-700 underline'> {user.displayName}</p>
          <button
            onClick={handleLogout}
            className='text-red-600 hover:text-rose-900'
          >
            LogOut
          </button>
        </>
      ) : (
        <div>
          <NavLink to='/login' className='hover:text-blue-700'>
            Login
          </NavLink>{" "}
          /{" "}
          <NavLink to='/signup' className='hover:text-blue-700'>
            SignUp
          </NavLink>{" "}
        </div>
      )}
    </div>
  );
  return (
    <header id='nav' className='select-none'>
      <nav className='w-full bg-gray-300 hover:bg-gradient-to-l from-sky-400 to-gray-300 flex items-center justify-between py-2 px-10 fixed top-0 z-20'>
        <NavLink to='/'>
          <img src={logo} alt='' className='w-24' />
        </NavLink>
        <div>
          <form
            action='submit'
            className='flex item-center bg-lime-400 rounded-lg w-fit overflow-hidden'
            onSubmit={(e) => SearchResults(e)}
          >
            <select name='' id='' className=' p-2 font-medium text-xl'></select>
            <input
              type='text'
              className='py-2 px-3 text-xl text-gray-600 outline-indigo-600'
              placeholder='Search Sahara.In'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <button className='p-2 text-xl bg-amber-500 hover:bg-amber-700 text-blue-500'>
              <IoSearch />
            </button>
          </form>
        </div>
        <div className='flex items-center justify-center w-fit gap-6'>
          {user ? (
            <>
              <NavLink to='/wishlist'>
                <FaHeart className='text-4xl text-rose-600' />
              </NavLink>

              <NavLink
                to='/cart'
                className='relative flex items-center justify-center w-fit gap-2'
              >
                <CiShoppingCart className='text-6xl' />
                <p className='absolute bottom-6 right-3 z-30 text-xl text-gray-100 bg-blue-600 cursor-pointer px-2 rounded-full'>
                  {totalProds ? totalProds : ""}
                </p>
              </NavLink>
            </>
          ) : (
            ""
          )}

          <div>{logio}</div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

// rounded-ss-lg rounded-es-lg
