import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { findLayerOne, searchCoin } from "../../utilities/coins-service";

import "./search.css";

const SearchCoins = () => {
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
    e.preventDefault();
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
      <div className="form-container">
        <form className="form" onSubmit={getCoin}>
          <input
            required
            className="search-bar"
            type="text"
            value={coinSearch}
            onChange={handleChange}
            placeholder="Search for a coin"
          />
          <i className="fa fa-search"></i>
        </form>
      </div>
      {searchedCoin.length === 0 && (
        <div className="home-header-container">
          <p>Name</p>
          <p>Ticker</p>
          <p>Price</p>
          <p>Market Cap</p>
          <p>Total Volume</p>
        </div>
      )}
      <div className="coin-container">
        {layerOne &&
          searchedCoin.length === 0 &&
          layerOne.map((l, idx) => (
            <div key={idx} className="coin-card">
              <Link className="card-elements" to={`/coins/${l.id}`} key={idx}>
                <p>
                  Name: {l.name} <img className="coin-img" src={l.image} />
                </p>
                <p>{l.symbol}</p>
                <p>${l.current_price}</p>
                <p>${l.market_cap}</p>
                <p>${l.total_volume}</p>
              </Link>
            </div>
          ))}
        {searchedCoin && (
          <div className="home-header-container">
            <p>Name</p>
            <p>Ticker</p>
          </div>
        )}
        {searchedCoin &&
          searchedCoin.map((c, idx) => (
            <div key={idx} className="coin-card">
              <Link
                className="search-card-elements"
                to={`/coins/${c.id}`}
                key={idx}
              >
                <p>
                  Name: {c.name} <img src={c.thumb}></img>
                </p>
                <p>Ticker: {c.symbol}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
  return isLoading ? renderLoading() : renderLayerOne();
};

export default SearchCoins;
