import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoinDetails } from "../../utilities/coins-service";

import { Chart as ChartJS } from "chart.js/auto";
import { Line, Bar, Doughnut } from "react-chartjs-2";

const Coins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinDetails, setCoinDetails] = useState([]);
  const [priceRangeData, setPriceRangeData] = useState([]);

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
      //   console.log("PRICE RANGE", detailResponse.priceRangeData);
      setCoinDetails(detailResponse.coinData);
      setPriceRangeData(detailResponse.priceRangeData);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log({ priceRangeData });

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

    const formatUnix = (unixMilliseconds) => {
      // Create a new Date object using the Unix timestamp in milliseconds
      const date = new Date(unixMilliseconds);

      // Get the month, day, hour, and minute from the date
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because it is zero-based
      const day = date.getDate().toString().padStart(2, "0");
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");

      // Format the date to "mm/dd"
      const formattedDate = `${month}/${day}`;
      const formattedTime = `${hour}:${minute}`;

      return { formattedDate, formattedTime };
    };

    const skipped = (ctx, value) =>
      ctx.p0.skip || ctx.p1.skip ? value : undefined;
    const down = (ctx, value) =>
      ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

    const genericOptions = {
      fill: false,
      interaction: {
        intersect: false,
      },
      radius: 4,
    };

    const data = {
      type: "line",
      data: {
        labels: priceRangeData.map((p) => [
          formatUnix(p[0]).formattedDate,
          formatUnix(p[0]).formattedTime,
        ]),
        datasets: [
          {
            label: "Price Chart",
            data: priceRangeData.map((p) => p[1]),
            borderColor: "rgb(75, 192, 192)",
            color: "black",
            backgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              const value = ctx.dataset.data[index];
              const previousValue =
                index > 0 ? ctx.dataset.data[index - 1] : null;
              return previousValue !== null && value > previousValue
                ? "rgb(75, 192, 192)"
                : "rgb(192,75,75)";
            },
            segment: {
              borderColor: (ctx) =>
                skipped(ctx, "rgb(0,0,0)") || down(ctx, "rgb(192,75,75)"),
              borderDash: (ctx) => skipped(ctx, [6, 6]),
            },
            spanGaps: true,
          },
        ],
      },
      options: genericOptions,
    };

    const ChartComponent = () => (
      <div className="line">
        <Line data={data.data} options={data.options} />
      </div>
    );

    return (
      <div>
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
              <br />
            </div>
          )}
        </div>
        {ChartComponent()}
      </div>
    );
  };

  useEffect(() => {
    getDetails();
  }, []);

  return isLoading ? renderLoading() : renderDetails();
};

export default Coins;
