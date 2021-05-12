const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  phone: {
    type: String,
    match: /^0\d{9}$/,
    unique: true,
  }, 
  role: {
    type: String,
    enum: ["admin", "customer", "company"],
    default: "customer",
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    match: /^\d{6}$/,
  },
  resetLink: {
    type: String,
    default: '',
  },
  idUser: {
    type: Schema.Types.ObjectId,
  },
  authType: {
    type: String,
    enum: ["google", "facebook", "local"],
    default: "local",
  },
  authGoogleID: {
    type: String,
    default: null,
  },
  authFacebookID: {
    type: String,
    default: null,
  },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Account = mongoose.model("Account", accountSchema);
