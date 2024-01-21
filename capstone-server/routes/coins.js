const express = require("express");
const router = express.Router();

const coinsCtrl = require("../controllers/coins");

router.get("/", coinsCtrl.getAllCoins);
router.get('/popular', coinsCtrl.getPopularCoins)


module.exports = router;