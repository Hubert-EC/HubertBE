const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    sender: {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            match: /^\d{10}$/,
            required: true,
        }
    },
    receiver: {
        name: String,
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            match: /^\d{10}$/,
            required: true,
        }
    },
    companyID: {
      type: String,
      required: true,
    },
    packageID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    shipPrice: {
        type: Number,
        required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    finalPrice: {
        type: Number,
        required: true,
    },
    saleCode: {
      type: String
    },
    paymentType: {
        type: String,
        enum: ["Momo", "PayPal"],
    },
    date: {
        dateSend: {
            type: Date,
            default: Date.now,
        },
        dateReceived: Date,
        dateVerified: Date,
        dateGet: Date,
        dateCanceled: Date,
    },
    status: {
        type: String,
        enum: ["Chờ xác nhận", "Chờ lấy hàng", "Đang giao", "Đã hủy", "Giao thành công"],
        default: "Chờ xác nhận",
    },
}, { timestamps: { createdAt: 'created_at' } })

module.exports = Bill = mongoose.model('Bill', billSchema);