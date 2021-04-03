const { defaultModel }= require('../common/config')

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema({
    name: defaultModel.string,
    maxAmount: defaultModel.string,
    maxWeight: defaultModel.string,
    price: defaultModel.string,
    month: defaultModel.string
})

module.exports = Package = mongoose.model("Package", packageSchema);