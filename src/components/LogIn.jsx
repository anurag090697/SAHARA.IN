import React, { useState, useContext, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { saharaContext } from "../App";

function LogIn() {
  const [failMessage, setFailMessage] = useState("");

  const { setUser } = useContext(saharaContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        navigate("/");
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setUser]);

  const handleChange = (e) => {
    setFailMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const auth = getAuth();
  //     await signInWithEmailAndPassword(auth, formData.email, formData.password);
  //     // The onAuthStateChanged listener will handle setting the user and navigation
  //   } catch (error) {
  //     setFailMessage("Email / Password Incorrect. Try Again...");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setUser(userCredential.user); 

      // console.log(userCredential)
      navigate("/"); 
    } catch (error) {
      setFailMessage("Email / Password Incorrect. Try Again...");
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle setting the user and navigation
    } catch (error) {
      setFailMessage("Error logging in with Google: " + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener will handle setting the user and navigation
    } catch (error) {
      setFailMessage("Error logging in with Facebook: " + error.message);
    }
  };

  return (
    <div className='flex flex-col gap-10 items-center justify-center py-10'>
      <div className='bg-sky-500 flex flex-col items-center justify-center gap-4 p-10 rounded-xl border-2 border-sky-800 shadow-xl shadow-sky-700'>
        <h1 className='mx-auto w-fit text-3xl font-medium text-gray-600'>
          Log In
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center gap-4'
        >
          <input
            placeholder='Enter Email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email"
            className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
          />
          <input
            placeholder='Enter Password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            aria-label="Password"
            minLength="6"
            className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
          />
          <button
            type='submit'
            className='bg-lime-400 font-medium border-2 text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-lime-700 hover:shadow-none hover:border-lime-600 hover:bg-lime-200 hover:text-gray-600'
          >
            LOGIN
          </button>
        </form>
        {failMessage && (
          <p className='text-red-700 w-fit mx-auto mt-4 underline'>
            {failMessage}
          </p>
        )}
        <h1 className='flex items-center px-2 font-medium text-2xl text-gray-600 w-full'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='flex flex-col items-center justify-center gap-4 mt-4'>
          <button
            onClick={handleGoogleLogin}
            className='flex items-center gap-2 bg-rose-400 py-2 px-3 font-medium text-gray-100 rounded-xl border-2 border-rose-600 shadow-md shadow-rose-700 hover:shadow-none hover:border-rose-400 hover:text-rose-600 hover:bg-rose-200'
          >
            <FaGoogle /> <p> | Login with Google</p>
          </button>
          <button
            onClick={handleFacebookLogin}
            className='flex items-center gap-2 bg-indigo-400 py-2 px-3 font-medium text-gray-100 rounded-xl border-2 border-indigo-600 shadow-md shadow-indigo-700 hover:shadow-none hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-200'
          >
            <FaFacebookF /> <p> | Login with Facebook</p>
          </button>
        </div>
        <div className='text-center'>
          <p>Don't have an account? </p>{" "}
          <button
            className='text-rose-700 hover:text-red-600'
            onClick={() => navigate("/signup")}
          >
            Sign Up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;