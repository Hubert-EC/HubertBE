const Account = require("../models/Account.Model.js");
const { sendError, sendSuccess } = require("./Controller");
const { HTTP_STATUS_CODE } = require("../common/constant.js");

const update = async (req, res, next) => {
  // try {
  //     const {idUser} = req.params
  //     const accountExists = await Account.findOne({idUser: idUser})
  //     accountExists.status = "activated"
  //     accountExists.expiresAt = null
  //     await accountExists.save()
  //     return res.status(500).json({message: "success"})
  // } catch (error) {
  //     console.log(error)
  //     return sendError(res, error.message, error.status)
  // }
};

module.exports = {
  update,
};
