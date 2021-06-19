const controller = require("../controllers/Transport.Controller.js");
const { verifyToken } = require("../services/Token.Services");
const express = require("express");
const router = express.Router();

router.route('/calculate-ship-price').post(verifyToken, controller.handleCalculateShipPrice)

module.exports = router;
