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
    match: /^\d{10}$/,
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
  idServicePackage : String,
});

module.exports = deliveryCompany = mongoose.model("Delivery Company", deliveryCompanySchema);
