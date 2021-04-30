const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliveryCompanySchema = new Schema({
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
  address: {
    type: String,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  idServicePackage: {
    type: String,
    required: true,
    match: /^[A-Z0-9]{6}$/,
  },
});

module.exports = DeliveryCompany = mongoose.model(
  "Delivery Company",
  deliveryCompanySchema
);
