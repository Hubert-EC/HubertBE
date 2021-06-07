const { sendError, sendSuccess } = require("./Controller");
const {calculateShip} = require("../services/Transport.Services")

const handleCalculateShipPrice = async (req, res, next) => {
  try {
    const {hight, width, length, kg, km} = req.body
    const result = await calculateShip(hight, width, length, kg, km)
    if (!result) {
      return sendError(res, result.message, result.status);
    }
    return sendSuccess(res, result.data, result.message, result.status);
  } catch (error) {
    return sendError(res, error.message, error.status);
  }
}

module.exports = {
  handleCalculateShipPrice,
}