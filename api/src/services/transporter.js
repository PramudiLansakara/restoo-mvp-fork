const nodemailer = require('nodemailer');
const {
  host, port, username, password,
} = require('../config').transporter;

// nodemailer.createTestAccount((err, account) => {
//   const transport = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, 
//     auth: {
//       user: account.user, 
//       pass: account.pass 
//     }
//   });
// });


// const transport = nodemailer.createTransport({
//   host,
//   port,
//   secure: false,
//   auth: {
//     user: username,
//     pass: password,
//   },
//   tls:{
//     rejectUnauthorized: false,
//   },
// });

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password,
  },
});

module.exports = transport;
