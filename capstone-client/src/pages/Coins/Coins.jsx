import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { findLayerOne } from "../../utilities/coins-service";

const Coins = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [layerOne, setLayerOne] = useState([])

  const renderLoading = () => (
    <section>
      <h2>Loading...</h2>
    </section>
  );

  const getLayerOneCoins = async (e) => {
    try {
      const layerResponse = await findLayerOne();
      setLayerOne(layerResponse);
      setIsLoading(false)
    } catch (err) {
      console.log("error");
    }
  };
  console.log({layerOne})

  async function handleRequest() {
    getLayerOneCoins()
  }

  useEffect(() => {
    handleRequest();
  }, []);

  const renderLayerOne = () => (
    <div>
      <h1>Coins page</h1>
      {layerOne && layerOne.map((l) => (
        <div key={idx}>

        </div>
      ))}
    </div>
  );
  return (isLoading ? renderLoading() : renderLayerOne());
};

export default Coins;
