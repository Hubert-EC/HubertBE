const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.router"));
router.use("/transport", require("./transport.router"));
router.use("/paypal", require("./paypal.router"));
module.exports = router;

