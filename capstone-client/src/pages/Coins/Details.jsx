import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findLayerOne, searchCoin } from "../../utilities/coins-service";
import { getCoinDetails } from "../../utilities/coins-service";

import "./coins.css";

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

  //   console.log({ coinDetails });

  const renderDetails = () => {
    const c = { ...coinDetails };

    const getTimeDifference = (date) => {
      const targetDate = new Date(date);
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - targetDate.getTime();
      const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;
      const yearsDifference = timeDifference / millisecondsPerYear;
      return yearsDifference.toFixed(0);
    };

    const formatDate = (date) => {
      const dateStr = new Date(date);
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = dateStr.toLocaleDateString("en-US", options);
      return formattedDate;
    };

    const getPriceDifference = (curPrice, oldPrice) => {
      const percentChange = ((curPrice - oldPrice) / oldPrice) * 100;
      const formattedChange =
        percentChange >= 0
          ? `+${percentChange.toFixed(2)}`
          : percentChange.toFixed(2);
      return formattedChange;
    };

    // console.log("PRICE DIFFERENCE", getPriceDifference(41000, 68000));
    // console.log("PRICE DIFFERENCE", getPriceDifference(41000, 67.81));

    return (
      <div>
        {coinDetails && (
          <div>
            <p>
              Name: {c.name} <img className="coin-img" src={c.image.thumb} />
            </p>
            <p>Id: {c.id}</p>
            <p>Ticker: {c.symbol}</p>
            <p>Description: {c.description.en || "N/A"}</p>
            {c?.links && (
              <div>
                <p>
                  Homepage:{" "}
                  <a href={c.links?.homepage?.[0]}>
                    {" "}
                    {c.links.homepage || "N/A"}
                  </a>
                </p>
                <p>
                  Whitepaper:{" "}
                  <a href={c.links?.whitepaper?.[0]}>
                    {c.links.whitepaper || "N/A"}
                  </a>
                </p>
                <p>
                  Reddit:{" "}
                  <a href={c.links?.subreddit_url?.[0]}>
                    {c.links.subreddit_url || "N/A"}
                  </a>
                </p>
                <p>
                  Github:{" "}
                  <a href={c.links?.repos_url?.github?.[0]}>
                    {c.links.repos_url.github[0] || "N/A"}
                  </a>
                </p>
              </div>
            )}
            <p>
              Current price: ${c.market_data.current_price.usd}{" "}
              <span className="one-day-change">
                {c.market_data.price_change_percentage_24h}
              </span>
            </p>
            <p>Market cap: ${c.market_data.market_cap.usd}</p>
            <p>Total volume: ${c.market_data.total_volume.usd}</p>
            <p>
              Price change(7d): {c.market_data.price_change_percentage_7d} %
            </p>
            <p>
              Price change(14d): {c.market_data.price_change_percentage_14d} %
            </p>
            <p>Total supply: {c.market_data.total_supply}</p>
            <p>Circulating supply: {c.market_data.circulating_supply}</p>
            <p>
              Max supply:{" "}
              {c.market_data.max_supply ? c.market_data.max_supply : "N/A"}
            </p>
            <p>
              All-time high: ${c.market_data.ath.usd}{" "}
              <span>
                {formatDate(c.market_data.ath_date.usd)} (
                {getTimeDifference(c.market_data.ath_date.usd)} years ago){" "}
                <br />
                {getPriceDifference(
                  c.market_data.current_price.usd,
                  c.market_data.ath.usd
                )}
                % difference
              </span>
            </p>
            <p>
              All-time low: ${c.market_data.atl.usd}{" "}
              <span>
                {formatDate(c.market_data.atl_date.usd)} (
                {getTimeDifference(c.market_data.atl_date.usd)} years ago)
                <br />
                {getPriceDifference(
                  c.market_data.current_price.usd,
                  c.market_data.atl.usd
                )}
                % difference
              </span>
            </p>
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
