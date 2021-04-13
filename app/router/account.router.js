const controller = require("../controllers/Account.Controller");

const express = require("express");
const router = express.Router();

router.route("/:idUser/update").post(controller.update);

module.exports = router;
