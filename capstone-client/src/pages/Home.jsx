import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findPopular } from "../utilities/coins-service";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [popularCoins, setPopularCoins] = useState(null);

  const getPopularCoins = async (e) => {
    try {
      const popularResponse = await findPopular();
      setPopularCoins(popularResponse);
      setIsLoading(false)
    } catch (err) {
      console.log("error");
    }
  };

  console.log({ popularCoins });

  useEffect(() => {
    getPopularCoins();
  }, []);

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const renderPopular = () => (
    <div>
    {popularCoins && popularCoins.map((p, idx) => (
      <div key={idx}>
        <p>Name: {p.item.name} <img src={p.item.thumb} className='coin-img'></img></p>
        <p>Ticker: {p.item.symbol}</p>
        <p>Price: {p.item.data.price}</p>
        <p>Market Cap: {p.item.data.market_cap}</p>
        <p>Total Volume: {p.item.data.total_volume}</p>
      </div>
    ))}
  </div>
  )

  return (isLoading ? renderLoading() : renderPopular());
};

export default Home;

