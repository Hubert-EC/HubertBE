const { HTTP_STATUS_CODE } = require("../common/constant");

const sendSuccess = (
  res,
  data,
  message = "success",
  status = HTTP_STATUS_CODE.OK
) => {
  return res.status(status).json({
    message: message,
    data: data,
  });
};

const sendError = (
  res,
  message = "internal server error",
  status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
) => {
  return res.status(status).json({
    message: message,
  });
};

module.exports = {
  sendError,
  sendSuccess,
};
