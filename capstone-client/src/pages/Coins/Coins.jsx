import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findLayerOne, searchCoin } from "../../utilities/coins-service";

const Coins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [layerOne, setLayerOne] = useState([]);
  const [coinSearch, setCoinSearch] = useState("");
  const [searchedCoin, setSearchedCoin] = useState([]);

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const getLayerOneCoins = async (e) => {
    try {
      const layerResponse = await findLayerOne();
      setLayerOne(layerResponse);
      setIsLoading(false);
    } catch (err) {
      console.log("error");
    }
  };


  const handleChange = (e) => {
    // console.log('e', e.target.value)
    setCoinSearch(e.target.value);
  };

//   console.log({ coinSearch });

  const getCoin = async (e) => {
    e.preventDefault()
    try {
    //   console.log("working");
      const searchResponse = await searchCoin(coinSearch);
      setSearchedCoin(searchResponse);
    } catch (err) {
      console.log("error");
    }
  };
    // console.log({ searchedCoin });

  async function handleRequest() {
    getLayerOneCoins();
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const renderLayerOne = () => (
    <div>
      <form onSubmit={getCoin}>
        <input
          type="text"
          value={coinSearch}
          onChange={handleChange}
          placeholder="Search for a coin"
        />
        <button type="submit">Search</button>
      </form>
      {layerOne && searchedCoin.length === 0 &&
        layerOne.map((l, idx) => (
          <div key={idx}>
            <p>
              Name: {l.name} <img src={l.image} className="coin-img" />
            </p>
            <p>Ticker: {l.symbol}</p>
            <p>Price: ${l.current_price}</p>
            <p>Market Cap: ${l.market_cap}</p>
            <p>Volume: ${l.total_volume}</p>
          </div>
        ))}
        {searchedCoin && searchedCoin.map((c, idx) => (
            <div key={idx}>
                <p>{c.name} <img src={c.thumb}></img></p>
                <p>{c.symbol}</p>
                <p>{c.name}</p>
                <p>{c.name}</p>
            </div>
        ))}
    </div>
  );
  return isLoading ? renderLoading() : renderLayerOne();
};

export default Coins;
