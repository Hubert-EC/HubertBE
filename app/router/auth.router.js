const controller = require("../controllers/Auth.Controller.js");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {} = require("../middleware/passport/passport"); //* config passport

router.use(passport.initialize());

router.route("/register").post(controller.register);
router.route("/verify").post(controller.verify);
router.route("/login").post(
  passport.authenticate("local", {
    session: false,
  }),
  controller.login
);
module.exports = router;
