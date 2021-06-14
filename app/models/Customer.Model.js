const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    match: /^0\d{9}$/,
    unique: true,
  },
  address: {
    type: String,
  }, 
  avt : String,
  // expiresAt: {
  //   type: Date,
  //   expires: 86400000,
  //   default: new Date().setDate(new Date().getDate() + 1),
  // },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Customer = mongoose.model("Customer", customerSchema);
