import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findLayerOne, searchCoin } from "../../utilities/coins-service";
import { getCoinDetails } from "../../utilities/coins-service";

const Coins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinDetails, setCoinDetails] = useState([]);

  const { id } = useParams();

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const getDetails = async (e) => {
    // const
    try {
      const detailResponse = await getCoinDetails(id);
      setCoinDetails(detailResponse);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log({ coinDetails });

  const renderDetails = () => {
    const c = { ...coinDetails };
    return (
      <div>
        {coinDetails && (
          <div>
            <p>
              Name: {c.name} <img className="coin-img" src={c.image.thumb} />
            </p>
            <p>Id: {c.id}</p>
            <p>Ticker: {c.symbol}</p>
            <p>Description: {c.description.en}</p>
            {c.links && (
              <p>
                Homepage:<a href={c.links.homepage}> {c.links.homepage}</a>
              </p>
            )}
            <p>Current Price: ${c.market_data.current_price.usd}</p>
            <p>Market Cap: ${c.market_data.market_cap.usd}</p>
            <p>Total Volume: ${c.market_data.total_volume.usd}</p>

            <p>24h%: {c.market_data.price_change_percentage_24h} %</p>
            <p>7d%: {c.market_data.price_change_percentage_7d} %</p>
            <p>14d%: {c.market_data.price_change_percentage_14d} %</p>
          </div>
          //       <p>Volume: ${l.total_volume}</p>
        )}
      </div>
    );
  };

  useEffect(() => {
    getDetails();
  }, []);

  return isLoading ? renderLoading() : renderDetails();
};

export default Coins;
