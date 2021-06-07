const controller = require("../controllers/Auth.Controller.js");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {} = require("../middleware/passport/passport"); //* config passport
const { verifyToken } = require("../services/Token.Services");
const { checkRole, activeDelivery } = require("../services/Auth.Services.js");
router.use(passport.initialize());

router
  .route("/login-google")
  .post(
    passport.authenticate("google-plus-token", { session: false }),
    controller.handleAuthGoogle
  );

router
  .route("/login-facebook")
  .post(
    passport.authenticate("facebook-token", { session: false }),
    controller.handleAuthFacebook
  );

router.route("/register").post(controller.handleRegister);
router.route("/register-delivery").post(controller.handleRegisterDeliveryCompany);
router.route("/forgot-password").post(controller.handleForgotPassword);
router.route("/reset-password").post(controller.handleResetPassword);
router.route("/login").post(controller.handleLogin);
router.route("/verify").post(controller.handleVerifyOtp);
router
  .route("/change-password")
  .post(verifyToken, controller.handleChangePassword);
router.route("/check-role").get(verifyToken, checkRole);
router.route("/active-delivery").post(verifyToken, controller.handleActiveDelivery);

module.exports = router;
