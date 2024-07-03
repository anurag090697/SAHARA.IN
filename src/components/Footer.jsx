/** @format */

import React from "react";
import logo from "../assets/logo1.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

function Footer() {
  return (
    <footer className='w-full bg-gradient-to-t from-gray-700 to-sky-300  flex flex-col items-center justify-between gap-6 pb-10'>
      <div
        className='bg-indigo-900 w-full text-white text-center font-medium text-xl p-2 cursor-pointer hover:bg-blue-800'
        onClick={() => {
          document.documentElement.scrollTop = 0;
        }}
      >
        <h3>Back To Top</h3>
      </div>
      <div className='w-36'>
        <img src={logo} alt='' />
      </div>
      <div className='flex items-center gap-3 text-white font-medium'>
        <a href='#'>Terms Of Use</a>
        <a href='#'>Privacy policy</a>
        <a href='#'>Help</a>
        <a href='#'>Api</a>
      </div>
      <div className='flex items-center gap-7 text-3xl'>
        <a href='' className="p-3 bg-gray-300 rounded-full text-gray-800 hover:bg-gray-400 hover:text-blue-600">
          <FaGithub />
        </a>
        <a href='' className="p-3 bg-gray-300 rounded-full text-blue-700 hover:bg-gray-400 hover:text-blue-600">
          <FaLinkedin />
        </a>
        <a href='' className="p-3 bg-gray-300 rounded-full text-violet-900 hover:bg-gray-400 hover:text-blue-600">
          <FaFacebookSquare />
        </a>
        <a href='' className="p-3 bg-gray-300 rounded-full text-rose-800 hover:bg-gray-400 hover:text-rose-600">
          <IoLogoInstagram />
        </a>
      </div>
      <div className="text-2xl font-medium text-amber-500">
        <h2>
          Created By-<a href='' className="text-green-500 hover:text-lime-500">Anurag Shukla</a>
        </h2>
      </div>
    </footer>
  );
}

export default Footer;

// hover:bg-gradient-to-l from-sky-700 to-gray-300
