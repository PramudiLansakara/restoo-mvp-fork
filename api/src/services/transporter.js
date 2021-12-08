const nodemailer = require('nodemailer');
const {
  host, port, username, password,
} = require('../config').transporter;

const transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user: username,
    pass: password,
  },
  tls:{
    rejectUnauthorized: false,
  },
});

module.exports = transport;
