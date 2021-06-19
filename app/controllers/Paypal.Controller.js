const paypal = require("paypal-rest-sdk");
const { sendError, sendSuccess } = require("./Controller");
const { Account, DeliveryCompany } = require("../models/Index.Model");
const {} = require("../common/paypal");
const queryString = require("query-string");

const handleCheckout = async (req, res, next) => {
  const idAcc = req.body.token.id;
  const user = await Account.findById(idAcc);

  if (!user) return sendError(res, "User not found", 404);

  const {
    senderName,
    senderAddress,
    senderPhone,
    receiverName,
    receiverAddress,
    receiverPhone,
    namePackage,
    weight,
    hight,
    length,
    width,
    distance,
    typePackage,
    companyName,
    price,
    notes,
  } = req.body;

  const deliveryCompany = await DeliveryCompany.findOne({
    companyName: companyName,
  });

  if (!deliveryCompany)
    return sendError(res, "Delivery Company not found", 404);

  const usd = (price / 23000).toFixed(2);
  const query = queryString.stringify({
    idUser: user._id,
    senderName: senderName,
    senderAddress: senderAddress,
    senderPhone: senderPhone,
    receiverName: receiverName,
    receiverAddress: receiverAddress,
    receiverPhone: receiverPhone,
    namePackage: namePackage,
    weight: weight,
    hight: hight,
    length: length,
    width: width,
    distance: distance,
    typePackage: typePackage,
    companyId: deliveryCompany._id,
    price: price,
    notes: notes,
  });

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:8080/api/paypal/payment-success/?${query}`,
      cancel_url: "http://localhost:8080/api/paypal/payment-cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: namePackage,
              sku: "001",
              price: `${usd}`,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: `${usd}`,
        },
        description: notes,
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      return sendError(res, error.message, error.status);
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

const handleCheckoutSuccess = async (req, res, next) => {
  const { price, PayerID, paymentId } = req.query;
  const usd = (price / 23000).toFixed(2);
  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: `${usd}`,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      return sendError(res, error.message, error.status);
    } else {
      next();
    }
  });
};

module.exports = { handleCheckout, handleCheckoutSuccess };
