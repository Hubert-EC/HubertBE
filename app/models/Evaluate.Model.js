const mongoose = require('mongoose')
const Schema = mongoose.Schema

const evaluateSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  star: {
    type: Number,
    enum: [1,2,3,4,5],
    required: true,
  },
  content: {
    type: String,
  },
})

module.exports = Evaluate = mongoose.model("Evaluate", evaluateSchema)