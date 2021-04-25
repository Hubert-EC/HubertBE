const controller = require("../controllers/Auth.Controller.js");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {} = require("../middleware/passport/passport"); //* config passport

router.use(passport.initialize());

router
  .route("/auth/google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    controller.AuthGoogle
  );

router
  .route("/auth/facebook")
  .post(
    passport.authenticate("facebook-token",{ session: false }),
    controller.AuthFacebook
  );

router.route("/register").post(controller.register);
router.route("/verify").post(controller.verify);
router.route("/login").post(
  passport.authenticate("local", {
    session: false,
  }),
  controller.login
);
module.exports = router;
