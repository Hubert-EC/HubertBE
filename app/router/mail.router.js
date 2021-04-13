const controller = require("../controllers/Mail.Controller.js");

const express = require("express");
const router = express.Router();

router.route("/send-mail").post(controller.sendCodeMail);

module.exports = router;
