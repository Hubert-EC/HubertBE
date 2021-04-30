const mailer = require("../common/mailer");
const Account = require("../models/Account.Model");
const { sendError, sendSuccess } = require("./Controller");
const { HTTP_STATUS_CODE } = require("../common/constant");

const sendCodeMail = async (req, res, next) => {
  try {
    const { to } = req.body;
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

    const account = await Account.findOne({ accountName: to });

    account.code = code;
    const result = await account.save();

    if (!result) return sendError(res, "Đã xảy ra lỗi vui lòng thử lại", HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)

    const body = "Welcome to Hubert: " + code;
    await mailer(to, "Kích hoạt tài khoản", body);

    return sendSuccess(res, "" , "success", HTTP_STATUS_CODE.OK);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
};

module.exports = {
  sendCodeMail,
};
