const express = require("express");
const { User } = require("../models/user");
const token = process.env.TOKEN;
const ROOT_URL = "https://pro-api.coingecko.com/api/v3";
const URL = "https://api.coingecko.com/api/v3";

const getAllCoins = async (req, res) => {
  try {
    const allCoinsResponse = await fetch(`${ROOT_URL}/coins/list/${token}`, {
      method: "GET",
    });
    const allCoinsData = await allCoinsResponse.json();
    res.json(allCoinsData);
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

const getPopularCoins = async (req, res) => {
  try {
    const popularResponse = await fetch(
      `${ROOT_URL}/search/trending/${token}`,
      {
        method: "GET",
      }
    );
    const popularData = await popularResponse.json();
    res.json(popularData);
  } catch (err) {
    console.log(err.message);
    res.json({ message: "error", error: res.statusText });
  }
};

const getLayerOne = async (req, res) => {
  try {
    const layerOneResponse = await fetch(
      `${ROOT_URL}/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=15&page=1&sparkline=false/${token}`,
      {
        method: "GET",
      }
    );
    const layerOneData = await layerOneResponse.json();
    res.json(layerOneData);
  } catch (err) {
    console.log(err.message);
    res.json({ message: "error", error: res.statusText });
  }
};

const searchCoins = async (req, res) => {
  const q = req.query.q;
  console.log({ q });
  try {
    const searchResponse = await fetch(`${URL}/search?query=${q}`, {
      method: "GET",
    });
    const searchData = await searchResponse.json();
    console.log(searchData);
    res.json(searchData);
  } catch (error) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

const getCoinDetails = async (req, res) => {
  const q = req.query.q;
  try {
    const coinResponse = await fetch(`${ROOT_URL}/coins/${q}/${token}`, {
      method: "GET",
    });
    const coinData = await coinResponse.json();
    console.log({ coinData });
    res.json(coinData);
  } catch (error) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

module.exports = {
  getAllCoins,
  getPopularCoins,
  getCoinDetails,
  getLayerOne,
  searchCoins,
};
