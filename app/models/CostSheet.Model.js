const mongoose = require('mongoose')
const Schema = mongoose.Schema

const costSheetSchema = new Schema({
    _id: String,
    maxKg: Number,
    firstPrice: {
      price: Number,
      km: Number,
      kg: Number
    },
    maxSize: {
      length: Number,
      width: Number,
      hight: Number,
    },
    pricePerKm: Number,
    pricePerKg: Number,
}, { timestamps: { createdAt: 'created_at' } })

module.exports = CostSheet = mongoose.model('Cost Sheet', costSheetSchema) 