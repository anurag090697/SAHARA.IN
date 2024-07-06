/** @format */

import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    country: "",
    mobileNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const db = getFirestore();
      await updateProfile(user, {
        displayName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        age: formData.age,
        country: formData.country,
        phoneNumber: formData.mobileNumber, 
      });

      alert("Sign up successful!");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        age: "",
        country: "",
        mobileNumber: "",
      });
      navigate("/login");
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google sign up successful!");
      navigate("/login");
    } catch (error) {
      alert("Error signing up with Google: " + error.message);
    }
  };

  const handleFacebookSignUp = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Facebook sign up successful!");
      navigate("/login");
    } catch (error) {
      alert("Error signing up with Facebook: " + error.message);
    }
  };

  return (
    <div className='flex items-center justify-center py-10'>
      <div className='bg-sky-300 rounded-xl border-2 border-gray-400 shadow-xl shadow-sky-900'>
        <h1 className='mx-auto w-fit mt-6 text-3xl font-medium text-amber-600'>
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex items-center flex-col w-fit p-8 rounded-xl '
        >
          <div className='flex gap-3 items-center justify-center'>
            <div className='flex flex-col gap-3 py-2 flex-wrap '>
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='text'
                name='fullName'
                placeholder='Full Name'
                onChange={handleChange}
                required
              />
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='email'
                name='email'
                placeholder='Email'
                onChange={handleChange}
                required
              />
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                required
              />
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col gap-3 '>
              <select
                name='gender'
                onChange={handleChange}
                required
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='number'
                name='age'
                placeholder='Age'
                onChange={handleChange}
                required
              />
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='text'
                name='country'
                placeholder='Country'
                onChange={handleChange}
                required
              />
              <input
                className='py-2 px-3 rounded-lg border-2 border-gray-400 shadow-md shadow-blue-700 outline-amber-500 font-medium'
                type='tel'
                name='mobileNumber'
                placeholder='Mobile Number'
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type='submit'
            className=' bg-lime-400 font-medium border-2 text-xl py-2 px-4 rounded-xl text-white shadow-md shadow-lime-700 hover:shadow-none hover:border-lime-600 hover:bg-lime-200 hover:text-gray-600'
          >
            Sign Up
          </button>
        </form>
        <h1 className='flex items-center px-2 font-medium text-2xl text-gray-600'>
          <hr className='w-1/2 border' />
          or <hr className='w-1/2  border' />
        </h1>
        <div className='flex flex-col  items-center justify-center  gap-4 py-4'>
          <button
            onClick={handleGoogleSignUp}
            className='flex items-center gap-2 bg-rose-400 py-2 px-3 font-medium text-gray-100 rounded-xl border-2 border-rose-600 shadow-md shadow-rose-700 hover:shadow-none hover:border-rose-400 hover:text-rose-600 hover:bg-rose-200'
          >
            {" "}
            <span className='mt-1'>
              {" "}
              <FaGoogle />
            </span>
            <span>| Sign up with Google</span>
          </button>
          <button
            onClick={handleFacebookSignUp}
            className='flex items-center gap-2 bg-indigo-400 py-2 px-3 font-medium text-gray-100 rounded-xl border-2 border-indigo-600 shadow-md shadow-indigo-700 hover:shadow-none hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-200'
          >
            {" "}
            <span className='mt-1'>
              {" "}
              <FaFacebookF />
            </span>
            <span>| Sign up with Facebook</span>
          </button>
        </div>
        <div className='w-fit mx-auto text-center font-medium text-gray-600 py-3'>
          <p>Already have a account</p>
          <button
            className='text-green-700 hover:text-lime-500'
            onClick={() => navigate("/login")}
          >
            Log In here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
