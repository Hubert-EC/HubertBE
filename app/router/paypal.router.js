const controller = require("../controllers/Paypal.Controller.js");
const {saveBill} = require("../services/Transport.Services")
const {verifyResetLink} = require("../services/Token.Services")
const express = require("express");
const router = express.Router();


router.post('/payment', verifyResetLink, controller.handleCheckout);
router.get('/payment-cancel', (req, res) => res.send('Cancelled'));
router.get('/payment-success', controller.handleCheckoutSuccess, saveBill);

module.exports = router;