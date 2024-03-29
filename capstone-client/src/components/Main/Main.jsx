import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Portfolio from "../../pages/Portfolio/Portfolio";
import Profile from "../../pages/Profile/Profile";
import SearchCoins from "../../pages/Coins/Search";
import Coins from "../../pages/Coins/Details";
import About from "../../pages/About";
import { useEffect, useState } from "react";

import "./Main.css";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/coins" element={<SearchCoins />} />
        <Route path="/coins/:id" element={<Coins />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Main;
