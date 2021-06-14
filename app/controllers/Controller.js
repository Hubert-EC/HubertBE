const { HTTP_STATUS_CODE } = require("../common/constant");

const sendSuccess = (res, data = {}, message, status) => {
  return res.status(status).json({
    message: message || "success",
    data: data,
  });
};

const sendError = (
  res,
  message,
  status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
) => {
  return res.status(status).json({
    message: message || "Internal server error",
  });
};

module.exports = {
  sendError,
  sendSuccess,
};
