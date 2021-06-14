const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  percent: {
    type: Number,
    enum: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  digit: {
    type: String,
    default: "%",
  },
  descriptions: String,
  companyID: {
    type: Schema.Types.ObjectId,
  },
  date: {
    dateCreate: {
      type: Date,
      default: Date.now,
    },
    dateExpired: {
      type: Date,
      default: Date.now,
    },
    dateUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  status: {
    type: String,
    enum: ["Khả dụng", "Hết hạn", "Hết mã"],
    default: "Khả dụng",
  },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Sale = mongoose.model("Sale", saleSchema);
