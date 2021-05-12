const express = require("express");

const router = express.Router();

router.use("/", require("./auth.router"));
router.use("/", require("./customer.router"));
router.use("/", require("./account.router"));
module.exports = router;
