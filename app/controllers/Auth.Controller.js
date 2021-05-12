const {
  registerCustomer,
  registerDeliveryCompany,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../services/Auth.Services");
const { encodedToken } = require("../services/Token.Services");
const { sendError, sendSuccess } = require("./Controller");
const { HTTP_STATUS_CODE } = require("../common/constant.js");

const handleAuthGoogle = async (req, res, next) => {
  try {
    const accessToken = encodedToken(req.user._id);
    res.setHeader("Authorization", accessToken);
    return sendSuccess(
      res,
      accessToken,
      "Register Successfully",
      HTTP_STATUS_CODE.CREATE
    );
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleAuthFacebook = async (req, res, next) => {
  try {
    const accessToken = encodedToken(req.user._id);
    res.setHeader("Authorization", accessToken);
    return sendSuccess(
      res,
      accessToken,
      "Register Successfully",
      HTTP_STATUS_CODE.CREATE
    );
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    if (!result.success) {
      return sendError(res, result.message, result.status);
    }

    const accessToken = encodedToken(result.data._id);
    res.setHeader("Authorization", accessToken);

    return sendSuccess(res, accessToken, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleRegister = async (req, res, next) => {
  try {
    const {
      username,
      email,
      phone,
      password,
      firstName,
      lastName,
    } = req.body;

    const result = await registerCustomer(
      username,
      email,
      phone,
      password,
      firstName,
      lastName
    );

    if (result.success) {
      return sendSuccess(res, result.data, result.message, result.status);
    }
    return sendError(res, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleRegisterDeliveryCompany = async (req, res, next) => {
  try {
    const {
      username,
      companyName,
      email,
      phone,
      password,
      firstName,
      lastName,
    } = req.body;

    const result = await registerDeliveryCompany(
      username,
      companyName,
      email,
      phone,
      password,
      firstName,
      lastName
    );

    if (result.success) {
      return sendSuccess(res, result.data, result.message, result.status);
    }
    return sendError(res, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
} //done

const handleForgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);

    if (!result.success) {
      return sendError(res, result.message, result.status);
    }

    return sendSuccess(res, result.data, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleResetPassword = async (req, res, next) => {
  try {
    const { resetLink, newPass } = req.body;
    const result = await resetPassword(resetLink, newPass);

    if (!result.success) {
      return sendError(res, result.message, result.status);
    }

    return sendSuccess(res, result.data, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleVerifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyOtp(email, otp);
    if (!result) {
      return sendError(res, result.message, result.status);
    }

    return sendSuccess(res, result.data, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const handleChangePassword = async (req, res, next) => {
  try {
    const id = req.body.token.id;
    const { oldPass, newPass } = req.body;

    const result = await changePassword(id, oldPass, newPass);
    if (!result.success) {
      return sendError(res, result.message, result.status);
    }

    return sendSuccess(res, result.data, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}; //done

const test = async (req, res, next) => {
  try {
    // const result = await sendLinkResetPassword(
    //   "nhai30928@gmail.com",
    //   "1239402132931"
    // );
    // console.log(result.success);
    // return sendSuccess(res, result.data, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
};

module.exports = {
  handleAuthFacebook,
  handleAuthGoogle,
  handleRegister,
  handleRegisterDeliveryCompany,
  handleLogin,
  handleForgotPassword,
  handleResetPassword,
  handleVerifyOtp,
  handleChangePassword,
  test,
};
