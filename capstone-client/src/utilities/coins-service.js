import * as coinsApi from './coins-api'

export async function findPopular() {
    try {
      const popular = await coinsApi.getPopularCoins();
      return popular;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }