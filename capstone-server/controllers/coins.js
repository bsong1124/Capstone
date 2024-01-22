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

const getCoin = async (req, res) => {
  // const q = req.query.q
  // try{
  //     const coinResponse = await fetch(`${ROOT_URL}/coins/bitcoin/${token}`, {
  //         method: "GET",
  //     })
  //     const coinData = await coinResponse.json()
  //     res.json(coinData)
  // }catch(error){
  //     console.log(err)
  //     res.json({message: 'error', error: res.statusText})
  // }
};

const getLayerOne = async (req, res) => {
  try {
    const layerOneResponse = await fetch(
      `${ROOT_URL}/coins/markets?vs_currency=usd&category=layer-1&order=market_cap_desc&per_page=10&page=1&sparkline=false/${token}`,
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

const createProfile = async (req, res) => {
  // console.log('REQ.BODY', req.body)
  // console.log('working')
  try {
    const profile = await User.findOne({ googleId: req.body.googleId });
    if (profile) {
      // console.log({profile})
    } else {
      const newProfile = await User.create(req.body);
      res.json(newProfile);
    }
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

const getProfile = async (req, res) => {
  console.log("GET PROFILE");
  console.log("REQ.QUERY.Q", req.query.q);
  const q = req.query.q;
  try {
    const profile = await User.findOne({ googleId: q });
    console.log({ profile });
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.json({ message: "error", error: res.status.text });
  }
};

const editProfile = async (req, res) => {
  console.log("REQ.BODY", req.body);
  try {
    const profile = await User.findOneAndUpdate(
      { googleId: req.body.googleId },
      req.body,
      {
        new: true,
      }
    );
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.status.text });
  }
};

const remove = async () => {};

module.exports = {
  getAllCoins,
  getPopularCoins,
  getCoin,
  getLayerOne,
  searchCoins,
  createProfile,
  getProfile,
  editProfile,
  delete: remove,
};
