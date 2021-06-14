const dotenv = require("dotenv");
// const result = dotenv.config({
//   path: ".env",
// });


const result = dotenv.config({
  silent: true
});

if (result.error) {
  throw result.error;
}

console.log(process.env)
module.exports = { ...process.env };
