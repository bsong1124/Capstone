import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findPopular } from "../utilities/coins-service";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [popularCoins, setPopularCoins] = useState(null);

  const getPopularCoins = async (e) => {
    try {
      const popularResponse = await findPopular();
      setPopularCoins(popularResponse);
      setIsLoading(false);
    } catch (err) {
      console.log("error");
    }
  };

  useEffect(() => {
    getPopularCoins();
  }, []);

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const renderPopular = () => (
    <div className='home-container'>
      <div className="home-header-container">
        <p>Name</p>
        <p>Ticker</p>
        <p>Price</p>
        <p>Market Cap</p>
        <p>Total Volume</p>
      </div>
      <div className="coin-container">
        {popularCoins &&
          popularCoins.map((p, idx) => (
            <div className="coin-card" key={idx}>
              <Link
                className="card-elements"
                to={`/coins/${p.item.id}`}
                key={idx}
              >
                <p>
                  {p.item.name}{" "}
                  <img src={p.item.thumb} className="coin-img"></img>
                </p>
                <p>{p.item.symbol}</p>
                <p>{p.item.data.price}</p>
                <p>{p.item.data.market_cap}</p>
                <p>{p.item.data.total_volume}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
  return isLoading ? renderLoading() : renderPopular();
};

export default Home;
