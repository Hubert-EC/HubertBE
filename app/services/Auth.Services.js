const { Account, Customer, DeliveryCompany } = require("../models/Index.Model");
const {
  sendCodeMail,
  sendLinkResetPassword,
  sendMailContact,
} = require("../services/Mail.Services");
const { HTTP_STATUS_CODE } = require("../common/constant");
const {encodedToken} = require("./Token.Services")
const bcrypt = require("bcrypt")

const registerCustomer = async (
  username,
  email,
  phone,
  password,
  firstName,
  lastName
) => {
  try {
    const emailExists = await Account.findOne({ accountName: email });
    if (emailExists)
      return {
        message: "Email already exists",
        success: false,
        status: HTTP_STATUS_CODE.FORBIDDEN,
      };

    const phoneExists = await Account.findOne({ phone });
    if (phoneExists)
      return {
        message: "Phone already exits",
        success: false,
        status: HTTP_STATUS_CODE.FORBIDDEN,
      };

    const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    await sendCodeMail(email, otp);

    const newCustomer = new Customer({
      username,
      email,
      phone,
      firstName,
      lastName,
    });
    await newCustomer.save();
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = new Account({});
    newAccount.accountName = email;
    newAccount.password = hashedPassword;
    newAccount.idUser = newCustomer._id;
    newAccount.phone = phone;
    newAccount.otp = otp + "";
    await newAccount.save();

    return {
      message: "Register Successfully. Verify code has been sent",
      success: true,
      status: HTTP_STATUS_CODE.CREATE,
      data: "",
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const registerDeliveryCompany = async (
  username,
  companyName,
  email,
  phone,
  password,
  firstName,
  lastName
) => {
  try {
    const emailExists = await Account.findOne({ accountName: email });
    if (emailExists)
      return {
        message: "Email already exists",
        success: false,
        status: HTTP_STATUS_CODE.FORBIDDEN,
      };

    const phoneExists = await Account.findOne({ phone });
    if (phoneExists)
      return {
        message: "Phone already exits",
        success: false,
        status: HTTP_STATUS_CODE.FORBIDDEN,
      };

    const newDeliveryCompany = new DeliveryCompany({
      username,
      companyName,
      email,
      phone,
      firstName,
      lastName,
    });
    await newDeliveryCompany.save();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = new Account({});
    newAccount.accountName = email;
    newAccount.password = hashedPassword;
    newAccount.idUser = newDeliveryCompany._id;
    newAccount.phone = phone;
    newAccount.role = "company";
    await newAccount.save();

    await sendMailContact(email);
    return {
      message: "Register Successfully. Please check your email for more information",
      success: true,
      status: HTTP_STATUS_CODE.CREATE,
      data: "",
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const login = async (email, password) => {
  try {
    const account = await Account.findOne({ accountName: email });
    if (!account) {
      return {
        message: "User with this email does not exist",
        success: false,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      account.password
    );
    if (!isCorrectPassword) {
      return {
        message: "Password is incorrect",
        success: false,
        status: HTTP_STATUS_CODE.UNAUTHORIZED,
      };
    }

    if (account.isVerified === false ) {
      let message = ""
      switch (account.role) {
        case "customer":
          const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
          account.otp = otp + "";
          await account.save();
          await sendCodeMail(email, otp);

          message = "Please verify your account"
          break;
        case "company":
          message = "Your enterprise account will be activated after contracting"
          break;
        default:
          break;
      }

      return {
        message: message,
        success: false,
        status: HTTP_STATUS_CODE.UNAUTHORIZED,
      };
    }

    return {
      message: "Login Successfully",
      data: account,
      success: true,
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

const forgotPassword = async (email) => {
  try {
    const account = await Account.findOne({ accountName: email });

    if (!account) {
      return {
        success: false,
        message: "User with this email does not exist",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    const resetLink = encodedToken(account._id);
    account.resetLink = resetLink;
    await account.save();

    const result = await sendLinkResetPassword(email, resetLink);

    return {
      message: result.message,
      data: "",
      success: true,
      status: result.status,
    };
  } catch (error) {
    return {
      message: error.message,
      success: false,
      status: error.status,
    };
  }
}; //done

const resetPassword = async (resetLink, newPass) => {
  try {
    const account = await Account.findOne({ resetLink });

    if (!account) {
      return {
        message: "Cannot found user with this reset link",
        success: false,
        status: HTTP_STATUS_CODE.NOT_FOUND,
      };
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    account.password = hashedPassword;
    await account.save();

    return {
      message: "Reset password successfully",
      data: "",
      success: true,
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

const changePassword = async (id, oldPass, newPass) => {
  try {
    const account = await Account.findById(id);
    if (!account) {
      return {
        message: "User not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
        success: false,
      };
    }

    const isCorrectPassword = await bcrypt.compare(oldPass, account.password);
    if (!isCorrectPassword) {
      return {
        message: "Old password is incorrect",
        status: HTTP_STATUS_CODE.UNAUTHORIZED,
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);
    account.password = hashedPassword;
    await account.save();
    return {
      message: "Change password successfully",
      data: "",
      status: HTTP_STATUS_CODE.OK,
      success: true,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
      success: false,
    };
  }
}; //done

const verifyOtp = async (email, otp) => {
  try {
    const account = await Account.findOne({ accountName: email });
    if (account) {
      if (account.otp === otp) {
        account.isVerified = true;
        await account.save();

        return {
          success: true,
          data: "",
          message: "Verify account successfully",
          status: HTTP_STATUS_CODE.OK,
        };
      }

      return {
        success: false,
        message: "Invalid otp",
        status: HTTP_STATUS_CODE.FORBIDDEN,
      };
    }

    return {
      success: false,
      message: "User not found",
      status: HTTP_STATUS_CODE.NOT_FOUND,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
      success: false,
    };
  }
}; //done

const checkRole = async (req, res, next) => {
  try {
    const id = req.body.token.id;
    const account = await Account.findById(id);
    if (!account) {
      return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Check role successfully",
      data: account.role,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}; //done

const activeDelivery = async (email) => {
  try {
    const account = await Account.findOne({accountName: email})
    if (!account) 
      return {
        success: false,
        message: "User not found",
        status: HTTP_STATUS_CODE.NOT_FOUND,
      }

    account.isVerified = true;
    await account.save();

    return {
      success: true,
      data: "",
      message: "Active Successfully",
      status: HTTP_STATUS_CODE.OK,
    }
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
      success: false,
    }
  }
}; //done

const getUserInformation = async (accountID) => {
  try {
    const account = await Account.findByID(accountID)
    if (!account) 
      return {
        message: "Account does not exist",
        status: HTTP_STATUS_CODE.NOT_FOUND,
        success: false,
      }

    const user = await Customer.findByID(account.idUser)
    if (!user)
      return {
        message: "User does not exist",
        status: HTTP_STATUS_CODE.NOT_FOUND,
        success: false,
      }

    if (account.role === 'company') {
      
    }
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
      success: false,
    }
  }
}

module.exports = {
  registerCustomer,
  registerDeliveryCompany,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  changePassword,
  checkRole,
  activeDelivery,
};
