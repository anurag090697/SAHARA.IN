/** @format */

// import React, { useEffect, useState } from "react";

// import ProductCard from "./ProductCard";
// import data from "./tempArr";
import BestSellers from "./BestSellers";
import Deals from "./Deals";
import TodayDeals from "./TodayDeals";

function Home() {
  return (
    <div>
      {" "}
      <TodayDeals></TodayDeals>
      <Deals></Deals>
      <BestSellers></BestSellers>
    </div>
  );
}

export default Home;
