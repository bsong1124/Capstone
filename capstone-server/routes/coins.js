const express = require("express");
const router = express.Router();

const coinsCtrl = require("../controllers/weather");

router.get("/", coinsCtrl.search);

module.exports = router;