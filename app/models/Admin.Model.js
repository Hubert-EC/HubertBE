const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
},{ timestamps: { createdAt: 'created_at' } });

module.exports = Admin = mongoose.model("Admin", adminSchema);
