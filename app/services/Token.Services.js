const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../common/config");
const { HTTP_STATUS_CODE } = require("../common/constant");

const encodedToken = (accountID) => {
  return JWT.sign(
    {
      iss: "Hubert",
      id: accountID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
    },
    JWT_SECRET
  );
}; //done

const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: "",
        access: false,
      });
    }
    //const token = header.split(" ")[1];
    JWT.verify(header, JWT_SECRET, (error, decodedFromToken) => {
      if (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
          message: "Failed to verify token",
          access: false,
        });
      } else {
        req.body.token = decodedFromToken;
        next();
      }
    });
  } catch (error) {
    return res.status(error.status).json({
      message: error.message,
    });
  }
}; //done

module.exports = {
  encodedToken,
  verifyToken,
};
