const controller = require("../controllers/Auth.Controller.js");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {} = require("../middleware/passport/passport"); //* config passport
const { verifyToken } = require("../services/Token.Services");
const { checkRole } = require("../services/Auth.Services.js");
router.use(passport.initialize());

router
  .route("/auth/google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    controller.handleAuthGoogle
  );

router
  .route("/auth/facebook")
  .post(
    passport.authenticate("facebook-token", { session: false }),
    controller.handleAuthFacebook
  );

router.route("/register").post(controller.handleRegister);
router.route("/registerDelivery").post(controller.handleRegisterDeliveryCompany);
router.route("/forgotPassword").post(controller.handleForgotPassword);
router.route("/resetPassword").post(controller.handleResetPassword);
router.route("/login").post(controller.handleLogin);
router.route("/verify").post(controller.handleVerifyOtp);
router
  .route("/changePassword")
  .post(verifyToken, controller.handleChangePassword);
router.route("/checkRole").get(verifyToken, checkRole);

router.route("/test").post(verifyToken, controller.test);

module.exports = router;
