const Joi = require("@hapi/joi");

module.exports.validateParam = (schema, id) => {
  return (req, res, next) => {
    const validatorResult = schema.validate({ param: req.params[id] });
    if (validatorResult.error)
      return res.status(400).json(validatorResult.error);
    else {
      if (!req.value) req.value = {};
      if (!req.value.params) req.value.params = validatorResult.value;
      next();
    }
  };
};

module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);
    if (validatorResult.error)
      return res.status(400).json(validatorResult.error.details);
    else {
        if (!req.value) req.value = {};
        if (!req.value.body) req.value.body = validatorResult.value;
        next();
    }
  };
};

module.exports.schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  registerCustomerSchema: Joi.object().keys({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^0\d{9}$/).required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),

  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),

  registerCompanySchema: Joi.object().keys({
    username: Joi.string().min(3).required(),
    companyName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(/^0\d{9}$/).required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),

  email: Joi.object().keys({
    email: Joi.string().email().required(),
  }),

  resetPassword: Joi.object().keys({
    newPass: Joi.string().min(8).required(),
    resetLink: Joi.string().required(),
  }),

  verifyOtp: Joi.object().keys({
    email:Joi.string().email().required(),
    otp: Joi.string().regex(/^\d{6}$/).required(),
  }),

  changePassword: Joi.object().keys({
    newPass: Joi.string().min(8).required(),
    oldPass: Joi.string().min(8).required(),
  }),
}
