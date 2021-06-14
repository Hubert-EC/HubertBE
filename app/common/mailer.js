const nodeMailer = require("nodemailer");
const { ADMIN_EMAIL, ADMIN_EMAIL_PASSWORD, PORT_SEND_MAIL } = require("./config");

const mailHost = "smtp.gmail.com";
const mailPort = PORT_SEND_MAIL;

const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: mailHost,
    port: mailPort,
    secure: true,
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_EMAIL_PASSWORD,
    },
  });

  const options = {
    from: ADMIN_EMAIL,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(options);
};

module.exports = sendMail;
