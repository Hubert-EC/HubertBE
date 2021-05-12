const dotenv = require("dotenv");
const result = dotenv.config({
  path: ".env",
});

if (result.error) {
  throw result.error;
}

// const defaultModel = {
//   date: { type: Date },
//   string: { type: String, default: '' },
//   stringUnique: { type: String, required: true, unique: true },
//   array: { type: Array, default: [] },
//   number: { type: Number, default: 0 },
//   boolean: { type: Boolean, default: true },
//   booleanFalse: { type: Boolean, default: false },
//   object: { type: Object, default: {} }
// }
// const {
//   MONGODB_URI,
//   PORT,
//   JWT_SECRET,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   FACEBOOK_CLIENT_ID,
//   FACEBOOK_CLIENT_SECRET,
// } = process.env;

module.exports = { ...process.env };
