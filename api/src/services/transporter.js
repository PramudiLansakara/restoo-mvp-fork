const nodemailer = require('nodemailer');
const {
  host, port, username, password,
} = require('../config').transporter;

const transport = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user: username,
    pass: password,
  },
  tls:{
    rejectUnauthorized: false,
  },
});

module.exports = transport;
