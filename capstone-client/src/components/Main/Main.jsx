import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Portfolio from "../../pages/Portfolio/Portfolio";
import Profile from "../../pages/Profile/Profile";
import Coins from "../../pages/Coins/Search";
import About from "../../pages/About";
import { useEffect, useState } from "react";

import "./Main.css";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route
          path="/profile"
          element={<Profile/>}
        />
        <Route path="/coins" element={<Coins />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <h1>Main Comp</h1>
    </div>
  );
};

export default Main;
