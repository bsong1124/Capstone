import * as coinsApi from "./coins-api";

export async function findPopular() {
  try {
    const popular = await coinsApi.getPopularCoins();
    return popular;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function findLayerOne() {
  try {
    const layerOne = await coinsApi.getLayerOneCoins();
    return layerOne;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function searchCoin(q) {
  console.log({ q });
  try {
    const search = await coinsApi.getSearchCoins(q);
    return search;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function createMyProfile(data) {
  // console.log({data})
  try {
    const portfolio = coinsApi.createProfile(data);
    return portfolio;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function getMyProfile(data) {
  // console.log('---SERVICE WORKING')
  try {
    const profile = coinsApi.getProfile(data);
    return profile;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

export async function editMyProfile(data) {
  console.log("---SERVICE WORKING");
  console.log({ data });
  try {
    const profile = coinsApi.editProfile(data);
    return profile;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
