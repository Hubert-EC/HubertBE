const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    accountName: {
        username: String,
        email: String,
        phone: String,
    },
    password: String,
    role: String,
    status: String,
    code: String,
    idUser: String,
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
})