const express = require("express");

const router = express.Router();

router.use("/auth", require("./auth.router"));
router.use("/transport", require("./transport.router"));
module.exports = router;
