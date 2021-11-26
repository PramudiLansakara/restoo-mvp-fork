const httpStatus = require('http-status');
// const APIError = require('../utils/APIError');
const transporter = require('../services/transporter');
// const nodemailer = require('nodemailer');

exports.sendMail = async (req, res, next) => {
  try {
    // const testAccount = await nodemailer.createTestAccount();
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false, 
    //   auth: {
    //     user: testAccount.user, 
    //     pass: testAccount.pass, 
    //   },
    // });

    const info = await transporter.sendMail({
      from: 'samaratungajs@gmail.com', // sender address
      to: 'it19244044@my.sliit.lk', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    return res.status(httpStatus.OK).json({ messageId: info.messageId });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { receiver } = req.body;

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" smtp.mymail.com', // sender address
      to: receiver, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    return res.status(httpStatus.OK).json({ messageId: info.messageId });
  } catch (err) {
    next(err);
  }
};
