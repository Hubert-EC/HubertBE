const mongoose = require("mongoose");
const {MONGODB_URI} = require('./config')


const connectDb = () => {
  mongoose
    .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Sucess!!!!"))
    .catch((error) => console.error("Failed: ", error));
};

module.exports = connectDb
