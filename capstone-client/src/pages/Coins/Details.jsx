import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findLayerOne, searchCoin } from "../../utilities/coins-service";
import { getCoinDetails } from "../../../../capstone-server/controllers/coins";

const Coins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coinDetails, setCoinDetails] = useState([]);

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
      console.log(err.message);
    }
  };

  const getDetails = async (e) => {
    try {
      const detailResponse = await getCoinDetails();
      setCoinDetails(detailResponse);
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const renderDetails = () => {};

  useEffect(() => {
    getDetails();
  });

  return isLoading ? renderLoading() : renderDetails();
};

export default Coins;
