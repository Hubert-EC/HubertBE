const { HTTP_STATUS_CODE } = require("../common/constant");
const { Bill, CostSheet } = require("../models/Index.Model");

const createOrder = async () => {};

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
        Grab: GRAB.data 
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
};

const shipPriceGHTK = async (kg) => {
  try {
    const GHTK = await CostSheet.findById("GHTK");
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
};

const shipPriceLalamove = async (hight, width, length, kg, km) => {
  try {
    const Lalamove = await CostSheet.findById("LALAMOVE");
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
};

const shipPriceGrabExpress = async (km) => {
  try {
    const GrabExpress = await CostSheet.findById("GRAB");
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
};

module.exports = {
  calculateShip,
};
