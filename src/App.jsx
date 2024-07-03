/** @format */

import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import "./firebase";
import Footer from "./components/Footer";
import { createContext, useContext } from "react";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import ProductDetailed from "./components/ProductDetailed";

export const saharaContext = createContext();
function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <div className='container pt-24 bg-gray-200 scroll-smooth min-w-full'>
        <saharaContext.Provider value={{ user, setUser, cart, setCart }}>
          <Header />
          <Routes>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/searchresults' element={<SearchResults />}></Route>
            <Route
              path='/productdetailed/:asin'
              element={<ProductDetailed />}
            ></Route>
          </Routes>
          <Footer></Footer>
        </saharaContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
