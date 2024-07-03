/** @format */

import React, { useContext, useEffect } from "react";
import logo from "../assets/logo1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { signOut, onAuthStateChanged, getAuth  } from "firebase/auth";
import { auth } from "../firebase";
import { saharaContext } from "../App";

function Header() {
  const { user, setUser } = useContext(saharaContext);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        // navigate("/");
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
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
    <header id='nav'>
      <nav className='w-full bg-gray-300 hover:bg-gradient-to-l from-sky-400 to-gray-300 flex items-center justify-between py-2 px-10 fixed top-0 z-20'>
        <NavLink to='/'>
          <img src={logo} alt='' className='w-24' />
        </NavLink>
        <div>
          <form
            action=''
            className='flex item-center bg-lime-400 rounded-lg w-fit overflow-hidden'
          >
            <select name='' id='' className=' p-2 font-medium text-xl'></select>
            <input
              type='text'
              className='py-2 px-3 text-xl text-gray-600 outline-indigo-600'
              placeholder='Search Sahara.In'
            />
            <button className='p-2 text-xl bg-amber-500 hover:bg-amber-700 text-blue-500'>
              <IoSearch />
            </button>
          </form>
        </div>
        <div className='flex items-center justify-center w-fit gap-6'>
          <div className='relative flex items-center justify-center w-fit gap-2'>
            <NavLink>
              <FaHeart className='text-3xl text-rose-600' />
            </NavLink>
            <NavLink>
              <CiShoppingCart className='text-6xl' />
            </NavLink>
            <p className='absolute bottom-6 right-3 z-30 text-xl text-gray-100 bg-blue-600  px-2 rounded-full'>
              {1}
            </p>
          </div>
          <div>{logio}</div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

// rounded-ss-lg rounded-es-lg
