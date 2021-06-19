const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z0-9]{6}$/,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  maxWeight: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  monthUsed: {
    type: Number,
    required: true,
  },
  date: {
    dateCreate: {
      type: Date,
      default: Date.now,
    }
  }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Service = mongoose.model("Service", serviceSchema);
