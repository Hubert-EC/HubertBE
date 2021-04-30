const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

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
  role: {
    type: String,
    enum: ["admin", "customer", "company"],
    default: "customer",
  },
  status: {
    type: String,
    enum: ["not activated", "activated"],
    default: "not activated",
  },
  code: {
    type: String,
    match: /^\d{6}$/,
  },
  // expiresAt: {
  //   type: Date,
  //   expires: 86400000,
  //   default: Date.now,
  // },
  idUser: {
    // type: String,
    // match: /^[a-zA-Z0-9]{24}$/,
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
});

accountSchema.pre("save", async function (next) {
  try {
    if (this.authType != 'local') return next();
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(this.password, salt);
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error);
  }
});

accountSchema.methods.verifyPassword = async function (reqPassword, next) {
  try {
    return await bcryptjs.compare(reqPassword, this.password);
  } catch (error) {
    next(error);
  }
};

module.exports = Account = mongoose.model("Account", accountSchema);
