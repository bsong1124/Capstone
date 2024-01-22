const express = require("express");
const router = express.Router();

const coinsCtrl = require("../controllers/coins");

router.get("/", coinsCtrl.getAllCoins);
router.post("/profile", coinsCtrl.createProfile);
router.get("/profile", coinsCtrl.getProfile);
router.get("/popular", coinsCtrl.getPopularCoins);
router.get("/layer-1", coinsCtrl.getLayerOne);
router.get("/search", coinsCtrl.searchCoins);

module.exports = router;
