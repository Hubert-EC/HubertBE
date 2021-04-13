const mongoose = require('mongoose')
const Schema = mongoose.Schema

const costSheetSchema = new Schema({
    CompanyID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    cost: {
        normal: Number,
        km: Number,
        cost: Number,
    },
    description: String,
})

module.exports = CostSheet = mongoose.model('Cost Sheet', costSheetSchema) 