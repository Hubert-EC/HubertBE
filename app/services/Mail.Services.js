const mailer = require("../common/mailer");
const { HTTP_STATUS_CODE } = require("../common/constant");
const { CLIENT_URL } = require("../common/config");

const sendCodeMail = async (email, otp) => {
  try {
    const body = "Welcome to Hubert, this is your verify code: " + otp;
    await mailer(email, "Kích hoạt tài khoản", body);

    return {
      message: "Verify code has been sent",
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

const sendLinkResetPassword = async (email, resetLink) => {
  try {
    const body = `<h2>Please click on given link to reset your password:</h2>
                  <p><a href = "${CLIENT_URL}/authentication/forgotpassword/${resetLink}"> ${CLIENT_URL}/authentication/forgotpassword/${resetLink} </a></p>
                  <p>Trân trọng,</p>
                  Hubert`;
    const result = await mailer(email, "Forgot Password", body);

    if (!result) 
      return {
        message: "Try again",
        success: false,
        status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      }
    

    return {
      message: "Reset password link has been sent",
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

const sendMailContact = async (email) => {
  try {
    const body = `<h2> Welcome to Hubert </h2>
    <p>Cảm ơn bạn đã đăng ký trở thành doanh nghiệp với công ty chúng tôi. Chúng tôi sẽ sớm liên lạc với công ty của bạn để ký hợp đồng.</p>
    <p>Tài khoản của bạn sẽ được kích hoạt sau khi ký hợp đồng.</p>
    <p>Trân trọng,</p>
        Hubert`;

    await mailer(email, "Register Successfully", body);

    return {
      message: "An email contact has been sent.",
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
module.exports = {
  sendCodeMail,
  sendLinkResetPassword,
  sendMailContact,
};
