import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoinDetails } from "../../utilities/coins-service";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
// import Hammer from "hammerjs";

ChartJS.register(zoomPlugin);

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
    try {
      const detailResponse = await getCoinDetails(id);
      setCoinDetails(detailResponse.coinData);
      setPriceRangeData(detailResponse.priceRangeData);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

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
      const date = new Date(unixMilliseconds);

      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");

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
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "xy",
          },
          limits: {
            x: 1,
          },
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.3,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
      interaction: {
        intersect: false,
      },
      radius: 4,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            maxTicksLimit: 6,
          },
        },
      },
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
            borderColor: "rgb(75, 192, 140)",
            color: "black",
            backgroundColor: (ctx) => {
              const index = ctx.dataIndex;
              const value = ctx.dataset.data[index];
              const previousValue =
                index > 0 ? ctx.dataset.data[index - 1] : null;
              return previousValue !== null && value > previousValue
                ? "rgb(75, 192, 140)"
                : "rgb(146, 60, 172)";
            },
            segment: {
              borderColor: (ctx) =>
                skipped(ctx, "rgb(0,0,0)") || down(ctx, "rgb(146, 60, 172)"),
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
        <div className="coin-container">
          {coinDetails && (
            <div className="details-container">
              <p>
                <img className="coin-img" src={c.image.thumb} />
                {c.name} <span>{c.symbol}</span>
              </p>
              <p id="current-price">
                ${c.market_data.current_price.usd.toFixed(2)}{" "}
                <span className="one-day-change">
                  {c.market_data.price_change_percentage_24h.toFixed(2)}%(1d)
                </span>
              </p>
              {/* <p>Id: {c.id}</p> */}
              {/* <p>Ticker: {c.symbol}</p> */}
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
                Market cap:{" "}
                {c.market_data.market_cap.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}
              </p>
              <p>
                Total volume:{" "}
                {c.market_data.total_volume.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}
              </p>
              <p>
                Price change(7d):{" "}
                {c.market_data.price_change_percentage_7d.toFixed(2)} %
              </p>
              <p>
                Price change(14d):{" "}
                {c.market_data.price_change_percentage_14d.toFixed(2)} %
              </p>
              <p>Total supply: {c.market_data.total_supply}</p>
              <p>Circulating supply: {c.market_data.circulating_supply}</p>
              <p>
                Max supply:{" "}
                {c.market_data.max_supply ? c.market_data.max_supply : "N/A"}
              </p>
              <p>
                All-time high: $
                {c.market_data.ath.usd.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                })}{" "}
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
          <div>{ChartComponent()}</div>
        </div>
        <div>
          <p>Description: {coinDetails.description.en || "N/A"}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getDetails();
  }, []);

  return isLoading ? renderLoading() : renderDetails();
};

export default Coins;
