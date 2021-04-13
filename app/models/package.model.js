const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  idBill: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Sting,
    enum: ["Thực phẩm", "Quần áo", "Điện tử", "Dễ vỡ", "Khác"],
    default: "Khác",
  },
  weight: {
    type: Number,
    required: true,
  },
  digit: {
    type: String,
    enum: ["kg", "g"],
    default: "kg",
  },
  notes: String,
});

module.exports = Package = mongoose.model("Package", packageSchema);
