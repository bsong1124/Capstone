const express = require("express");
const router = express.Router();

const coinsCtrl = require("../controllers/coins");
const usersCtrl = require("../controllers/user");

router.get("/", coinsCtrl.getAllCoins);
// router.delete("/profile", coinsCtrl.delete);
router.get("/popular", coinsCtrl.getPopularCoins);
router.get("/layer-1", coinsCtrl.getLayerOne);
router.get("/search", coinsCtrl.searchCoins);
router.post("/profile", usersCtrl.createProfile);
router.get("/profile", usersCtrl.getProfile);
router.put("/profile", usersCtrl.editProfile);
router.get("/show");

module.exports = router;
