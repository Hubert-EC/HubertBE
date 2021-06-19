const dotenv = require("dotenv");
const result = dotenv.config();

// if (result.error) {
//   throw result.error;
// }

console.log(process.env)
module.exports = { ...process.env };
