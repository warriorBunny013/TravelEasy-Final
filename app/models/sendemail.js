// "use strict";
const nodemailer = require("nodemailer");
// const emailpage=require('../../resources/views/auth/emailpage')
// async..await is not allowed in global scope, must use a wrapper
const dotenv = require("dotenv");
dotenv.config();


async function sendEmail(mailOptions) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: mailOptions.from, // sender address
    to: mailOptions.to, // list of receivers
    subject: mailOptions.subject, // Subject line
    html: mailOptions.html, // html body
  });

  console.log("Email sent successfully");
}

// sendEmail().catch(console.error);

module.exports=sendEmail
