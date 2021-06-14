const controller = require("../controllers/Auth.Controller.js");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const {} = require("../middleware/passport/passport"); //* config passport
const { verifyToken, verifyResetLink } = require("../services/Token.Services");
const { checkRole, activeDelivery } = require("../services/Auth.Services.js");
const {validateBody, validateParam, schemas} = require("../middleware/validate/index");
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

router.route("/register").post(validateBody(schemas.registerCustomerSchema), controller.handleRegister);
router.route("/register-delivery").post(validateBody(schemas.registerCompanySchema), controller.handleRegisterDeliveryCompany);
router.route("/forgot-password").post(validateBody(schemas.email), controller.handleForgotPassword);
router.route("/reset-password").post(validateBody(schemas.resetPassword), verifyResetLink, controller.handleResetPassword);
router.route("/login").post(validateBody(schemas.loginSchema), controller.handleLogin);
router.route("/verify").post(validateBody(schemas.verifyOtp), controller.handleVerifyOtp);
router
  .route("/change-password")
  .post(validateBody(schemas.changePassword), verifyToken, controller.handleChangePassword);
router.route("/check-role").get(verifyToken, checkRole);
router.route("/active-delivery").post(validateBody(schemas.email), verifyToken, controller.handleActiveDelivery);

module.exports = router;
