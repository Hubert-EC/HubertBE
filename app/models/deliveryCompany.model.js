const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliveryCompanySchema = new Schema({
  username: {
    type: String,
    minLength: 3,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
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
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address:[String],
  idServicePackage: {
    type: String,
    match: /^[A-Z0-9]{6}$/,
  },
  avt : String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports = DeliveryCompany = mongoose.model(
  "Delivery Company",
  deliveryCompanySchema
);
