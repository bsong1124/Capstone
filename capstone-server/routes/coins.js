const express = require("express");
const router = express.Router();

const coinsCtrl = require("../controllers/coins");
const coins = require("../controllers/coins");

router.get("/", coinsCtrl.getAllCoins);
router.post("/profile", coinsCtrl.createProfile);
router.get("/profile", coinsCtrl.getProfile);
router.put("/profile", coinsCtrl.editProfile);
router.get("/popular", coinsCtrl.getPopularCoins);
router.get("/layer-1", coinsCtrl.getLayerOne);
router.get("/search", coinsCtrl.searchCoins);

module.exports = router;
