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
      console.log(popularData.coins)
      return popularData.coins;
    } else {
      console.log(err.message);
    }
  }