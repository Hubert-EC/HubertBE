const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const policySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = Policy = mongoose.model('Policy', policySchema)