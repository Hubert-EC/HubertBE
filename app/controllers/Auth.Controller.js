const Account = require("../models/Account.Model.js");
const Customer = require("../models/Customer.Model.js");
const { sendError, sendSuccess } = require("./Controller");
const { HTTP_STATUS_CODE } = require("../common/constant.js");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../common/config");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "Hubert",
      id: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
};

const AuthGoogle = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    res.setHeader("Authorization", token);
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const AuthFacebook = async (req, res, next) => {
  try {
    const token = encodedToken(req.user._id);
    res.setHeader("Authorization", token);
    return res.status(HTTP_STATUS_CODE.OK).json({ success: true });
  } catch (err) {
    next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email, newPass, rePass } = req.body;
    const account = await Account.find({ accountName: email });
    if (!account)
      return sendError(
        res,
        "Tài khoản không tồn tại.",
        HTTP_STATUS_CODE.NOT_FOUND
      );

    if (newPass != rePass)
      return sendError(
        res,
        "Các mật khẩu đã nhập không khớp. Hãy thử lại",
        HTTP_STATUS_CODE.FORBIDDEN
      );

    const newAccount = account;
    newAccount.password = newPass;
    const result = await Account.findByIdAndUpdate(account._id, newAccount);

    if (!result)
      return sendError(res, "Lỗi", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);

    const token = encodedToken(newAccount._id);
    res.setHeader("Authorization", token);
    return sendSuccess(res, email, "success", HTTP_STATUS_CODE.OK);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
};

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const account = await Account.find({ accountName: email });
    const token = encodedToken(account[0].idUser);
    res.setHeader("Authorization", token);
    return sendSuccess(res, "", "success", HTTP_STATUS_CODE.OK);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
};

const register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      phone,
      password,
      rePassword,
      firstName,
      lastName,
    } = req.body;

    const emailExists = await Customer.findOne({ email });
    if (emailExists)
      return sendError(res, "Email đã tồn tại", HTTP_STATUS_CODE.FORBIDDEN);

    const phoneExists = await Customer.findOne({ phone });
    if (phoneExists)
      return sendError(
        res,
        "Số điện thoại đã tồn tại",
        HTTP_STATUS_CODE.FORBIDDEN
      );

    if (password != rePassword)
      return sendError(
        res,
        "Các mật khẩu đã nhập không khớp. Hãy thử lại",
        HTTP_STATUS_CODE.FORBIDDEN
      );

    const newCustomer = new Customer({
      username,
      email,
      phone,
      firstName,
      lastName,
    });
    const result1 = await newCustomer.save();

    const newAccount = new Account({});
    newAccount.accountName = email;
    newAccount.password = password;
    newAccount.idUser = newCustomer._id;

    const result2 = await newAccount.save();

    if (!result2 || !result1)
      return sendError(
        res,
        "Đã xảy ra lỗi vui lòng thử lại",
        HTTP_STATUS_CODE.BAD_REQUEST
      );

    const token = encodedToken(newAccount._id);
    res.setHeader("Authorization", token);
    return sendSuccess(res, email, "success", HTTP_STATUS_CODE.CREATE);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { code, email } = req.body;
    const account = await Account.findOne({ accountName: email });

    if (code == account.code) {
      account.status = "activated";
      //account.expiresAt = null;
      await account.save();
      return sendSuccess(res, email, "success", HTTP_STATUS_CODE.OK);
    }

    return sendError(
      res,
      "Mã xác thực không hợp lệ",
      HTTP_STATUS_CODE.BAD_REQUEST
    );
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
};

module.exports = {
  AuthFacebook,
  AuthGoogle,
  register,
  login,
  verifyCode,
  forgotPassword,
};
