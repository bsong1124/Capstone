const express = require("express");
const token = process.env.TRIPADVISOR_TOKEN;
// const ROOT_URL = "https://api.coingecko.com/api/v3/coins/list";

const getAllCoins = async (req, res) => {
  try {
    const allCoinsResponse = await fetch("https://api.coingecko.com/api/v3/coins/list", {
      method: "GET",
    });
    const allCoinsData = await allCoinsResponse.json();
    res.json(allCoinsData);
  } catch (err) {
    console.log(err);
    res.json({ message: "error", error: res.statusText });
  }
};

const getPopularCoins = async (req,res) => {
    try {
        const popularResponse = await fetch("https://api.coingecko.com/api/v3/search/trending", {
            method: 'GET',
        })
        const popularData = await popularResponse.json()
        res.json(popularData)
    }catch(err){
        console.log(err.message)
        res.json({message: 'error', error: res.statusText})
    }
}

const getCoin = async (req,res) => {
    const q = req.query.q
    try{
        const coinResponse = await fetch(`https://api.coingecko.com/api/v3/coins/${q}`, {
            method: "GET",
        })
        const coinData = await coinResponse.json()
        res.json(coinData)
    }catch(error){
        console.log(err)
        res.json({message: 'error', error: res.statusText})
    }
}

module.exports = {
  getAllCoins,
  getPopularCoins,
  getCoin,
};