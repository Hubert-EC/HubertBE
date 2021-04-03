const dotenv = require("dotenv");
const result = dotenv.config({
  path: ".env",
});

if (result.error) {
  throw result.error;
}

// const {
//   MONGODB_URI,
//   PORT,
//   JWT_SECRET,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   FACEBOOK_CLIENT_ID,
//   FACEBOOK_CLIENT_SECRET,
// } = process.env;

module.exports = {...process.env}