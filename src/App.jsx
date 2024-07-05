/** @format */

import { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Footer from "./components/Footer";
import { createContext } from "react";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import ProductDetailed from "./components/ProductDetailed";
import Cart from "./components/Cart";
import Wishlisht from "./components/Wishlisht";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist } from "./slice";
import { db } from "./firebase"; // Import the Realtime Database instance
import { ref, get, set } from "firebase/database";

export const saharaContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const { cart, wishlist } = useSelector((state) => state.eCommerce);
  const dispatch = useDispatch();
  let userId;

  if (user) {
    userId = user.uid;
  }
  // || "BdoW6Dd6byQH8em6ZVrZPOPFRjO2"; // Replace with actual user ID from authentication

  useEffect(() => {
    const fetchCartAndWishlist = async () => {
      try {
        const cartRef = ref(db, `carts/${userId}`);
        const wishlistRef = ref(db, `wishlists/${userId}`);

        const cartSnapshot = await get(cartRef);
        const wishlistSnapshot = await get(wishlistRef);

        if (cartSnapshot.exists()) {
          dispatch(addToCart(cartSnapshot.val().items || []));
        }
        if (wishlistSnapshot.exists()) {
          dispatch(addToWishlist(wishlistSnapshot.val().items || []));
        }
      } catch (error) {
        console.error(
          "Error fetching cart and wishlist from Firebase Realtime Database:",
          error
        );
      }
    };
    if (userId) {
      fetchCartAndWishlist();
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const updateCartInRealtimeDB = async () => {
      try {
        const cartRef = ref(db, `carts/${userId}`);
        await set(cartRef, { items: cart });
      } catch (error) {
        console.error(
          "Error updating cart in Firebase Realtime Database:",
          error
        );
      }
    };

    if (cart.length > 0) {
      updateCartInRealtimeDB();
    }
  }, [cart, userId]);

  useEffect(() => {
    const updateWishlistInRealtimeDB = async () => {
      try {
        const wishlistRef = ref(db, `wishlists/${userId}`);
        await set(wishlistRef, { items: wishlist });
      } catch (error) {
        console.error(
          "Error updating wishlist in Firebase Realtime Database:",
          error
        );
      }
    };

    if (wishlist.length > 0) {
      updateWishlistInRealtimeDB();
    }
  }, [wishlist, userId]);

  return (
    <BrowserRouter>
      <div className='container pt-20 bg-gray-200 scroll-smooth min-w-full'>
        <saharaContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route path='/signup' element={<SignUp />}>
              {/* {console.log(wishlist, cart)} */}
            </Route>
            <Route path='/login' element={<LogIn />}></Route>
            <Route path='/' element={<Home></Home>}></Route>
            <Route
              path='/searchresults/:searchQuery'
              element={<SearchResults />}
            ></Route>
            <Route
              path='/productdetailed/:asin'
              element={<ProductDetailed />}
            ></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/wishlist' element={<Wishlisht />}></Route>
          </Routes>
          <Footer></Footer>
        </saharaContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
