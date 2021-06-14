const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Thực phẩm", "Quần áo", "Điện tử", "Dễ vỡ", "Khác"],
    default: "Khác",
  },
  size: {
    length: Number,
    width: Number,
    hight: Number,
  },
  weight: {
    type: Number,
    required: true,
  },
  notes: String,
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Package = mongoose.model("Package", packageSchema);
