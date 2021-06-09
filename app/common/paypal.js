const paypal = require("paypal-rest-sdk");
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = require("../common/config");

paypal.configure({
  mode: "sandbox",
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_CLIENT_SECRET,
});
