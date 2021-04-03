const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  firstName: {
    type: String,

  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    match: /^\d{10}$/,
    unique: true,
    required: true,
  },
  address: {
    type: String,
  },
});

module.exports = Customer = mongoose.model("Customer", customerSchema);
