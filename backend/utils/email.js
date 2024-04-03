const nodemailer = require('nodemailer');

const transporter = () => {
    const transport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "nasim.1990@hotmail.com",
          pass: "Delln4011",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
      },
    });
    return transport
}

const generateMailOptions = (from, to, subject, html) => {
    return {
      from: from,
      to: to,
      subject: subject,
      html: html
    };
  };

module.exports = { transporter , generateMailOptions }