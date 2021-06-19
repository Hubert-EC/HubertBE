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
    required: true,
  },
  phone: {
    type: String,
    match: /^0\d{9}$/,
  },
  address: {
    type: String,
  }, 
  avt : String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Customer = mongoose.model("Customer", customerSchema);
