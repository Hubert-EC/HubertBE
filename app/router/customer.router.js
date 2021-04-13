const controller = require("../controllers/Customer.Controller");

const express = require("express");
const router = express.Router();

router.route("/customer/update").post(controller.update);

module.exports = router;
