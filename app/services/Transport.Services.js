const { HTTP_STATUS_CODE } = require("../common/constant");
const { sendError, sendSuccess } = require("../controllers/Controller");
const { Bill, CostSheet, Package } = require("../models/Index.Model");

const calculateShip = async (hight, width, length, kg, km) => {
  try {
    const LALAMOVE = await shipPriceLalamove(hight, width, length, kg, km);
    const GHTK = await shipPriceGHTK(kg);
    const GRAB = await shipPriceGrabExpress(km);
    return {
      message: "Calculate Successfully",
      success: true,
      data: {
        Lalamove: LALAMOVE.data,
        Ghtk: GHTK.data,
        Grab: GRAB.data,
      },
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const shipPriceGHTK = async (kg) => {
  try {
    const GHTK = await CostSheet.findOne({ companyName: "GHTK" });
    let price = GHTK.firstPrice.price;
    if (kg > GHTK.firstPrice.kg) {
      price += (kg - GHTK.firstPrice.kg) * GHTK.pricePerKg;
    }

    return {
      message: "Calculate Successfully",
      success: true,
      data: price,
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const shipPriceLalamove = async (hight, width, length, kg, km) => {
  try {
    const Lalamove = await CostSheet.findOne({ companyName: "LALAMOVE" });
    if (
      kg <= Lalamove.maxKg &&
      hight <= Lalamove.maxSize.hight &&
      width <= Lalamove.maxSize.width &&
      length <= Lalamove.maxSize.length
    ) {
      let price = Lalamove.firstPrice.price;
      if (km > Lalamove.firstPrice.km) {
        price += (km - Lalamove.firstPrice.km) * Lalamove.pricePerKm;
      }
      return {
        message: "Calculate Successfully",
        success: true,
        data: price,
        status: HTTP_STATUS_CODE.OK,
      };
    }

    return {
      message: "Can't calculate",
      data: null,
      success: true,
      status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const shipPriceGrabExpress = async (km) => {
  try {
    const GrabExpress = await CostSheet.findOne({ companyName: "GRAB" });
    let priceShip = GrabExpress.firstPrice.price;
    if (km > GrabExpress.firstPrice.km) {
      priceShip += (km - GrabExpress.firstPrice.km) * GrabExpress.pricePerKm;
    }
    return {
      message: "Calculate Successfully",
      success: true,
      data: priceShip,
      status: HTTP_STATUS_CODE.OK,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const saveBill = async (req, res, next) => {
  const {
    idUser,
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
    companyId,
    price,
    notes,
  } = req.query;

  const package = new Package({
    idUser: idUser,
    name: namePackage,
    type: typePackage,
    size: {
      length: length,
      width: width,
      hight: hight,
    },
    weight: weight,
    notes: notes,
  });
  await package.save();

  const bill = new Bill({
    sender: {
      _id: idUser,
      name: senderName,
      address: senderAddress,
      phone: senderPhone,
    },
    receiver: {
      name: receiverName,
      address: receiverAddress,
      phone: receiverPhone,
    },
    companyID: companyId,
    packageID: package._id,
    shipPrice: price,
    distance: distance,
    finalPrice: price,
    saleCode: null,
    paymentType: "PayPal",
  });

  await bill.save();

  return sendSuccess(
    res,
    {
      bill: bill,
      package: package,
    },
    "Payment successfully",
    HTTP_STATUS_CODE.OK
  );
}; //done

module.exports = {
  calculateShip,
  saveBill,
};
