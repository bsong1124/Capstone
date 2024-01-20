import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Portfolio from "../../pages/Portfolio/Portfolio";
import Profile from "../../pages/Profile/Profile";
import Coins from "../../pages/Coins/Coins";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/coins' element={<Coins/>}/>
      </Routes>
      <h1>Main Comp</h1>
    </div>
  );
};

export default Main;
