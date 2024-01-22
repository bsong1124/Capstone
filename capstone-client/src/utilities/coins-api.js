import config from "../config";

export async function getPopularCoins() {
  const popularResponse = await fetch(`${config.BASE_URL}/popular`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (popularResponse.ok) {
    const popularData = await popularResponse.json();
    // console.log(popularData.coins);
    return popularData.coins;
  } else {
    console.log(err.message);
  }
}

export async function getLayerOneCoins() {
  const layerResponse = await fetch(`${config.BASE_URL}/layer-1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (layerResponse.ok) {
    const layerData = await layerResponse.json();
    // console.log({ layerData });
    return layerData;
  } else {
    console.log(err.message);
  }
}

export async function getSearchCoins(q) {
  const searchResponse = await fetch(`${config.BASE_URL}/search?q=${q}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (searchResponse.ok) {
    const searchData = await searchResponse.json();
    //   console.log({ searchData });
    return searchData.coins;
  } else {
    console.log(err.message);
  }
}