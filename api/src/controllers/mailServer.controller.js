const httpStatus = require('http-status');
const Email = require('email-templates');
const path = require('path');
const transporter = require('../services/transporter');

exports.getMail = async (req, res, next) => {
  try {
    const email = new Email({
      views: { root: './emails', options: { extension: 'ejs' } },
      message: {
        // preview: true,
        from: 'samaratungajs@gmail.com',
        // attachments:
        // [{
        //   filename:'hello.txt',
        //   path:'.src/controllers/files/hello.txt',
        //   contentType:'text/plain'
        // },
        // {
        //   filename:'sample.txt',
        //   content:'sample attachement - content',
        //   contentType:'text/plain'
        // }]
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });

    // email
    //   .renderAll('reservation', {
    //     name: 'Elon'
    //   }).then(console.log)
    //   .catch(console.error);

    const status = email
      .send({
        // template: 'reservation',
        template: path.join(__dirname, 'emails', 'reservation'),
        message: {
          to: 'it19244044@my.sliit.lk',
          // attachments:
          // [{
          //   filename:'individual.txt',
          //   content:'Individual attachement',
          //   contentType:'text/plain'
          // }]
        },
        locals: {
          name: 'Elon',
          reservationDate: '22-12-2021',
          from: '5',
          to: '6',
          personCount: '5',
          note: 'note',
        },
      });
      // .catch(console.error);

    // const info = await transporter.sendMail({
    //   from: 'samaratungajs@gmail.com', // sender address
    //   to: 'it19244044@my.sliit.lk', // list of receivers
    //   subject: 'Hello ✔', // Subject line
    //   text: 'Hello world?', // plain text body
    //   html: '<b>Hello world?</b>', // html body
    // });

    return res.status(httpStatus.OK).json({ message: status });
  } catch (err) {
    next(err);
  }
};

exports.sendMail = async (req, res, next) => {
  try {
    const {
      receiverEmail, name, reservationDate, from, to, personCount, note,
    } = req.body;
    const email = new Email({
      views: { root: './emails', options: { extension: 'ejs' } },
      message: {
        preview: false,
        from: 'samaratungajs@gmail.com',
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport: transporter,
    });

    const response = await email.send({
      // template: 'reservation',
      template: path.join(__dirname, 'emails', 'reservation'),
      message: {
        to: receiverEmail,
      },
      locals: {
        name,
        reservationDate,
        from,
        to,
        personCount,
        note,
      },
    });

    return res.status(httpStatus.OK).json({ message: response });
  } catch (err) {
    next(err);
  }
};

// exports.create = async (req, res, next) => {
//   try {
//     const { receiver } = req.body;

//     const info = await transporter.sendMail({
//       from: '"Fred Foo 👻" smtp.mymail.com', // sender address
//       to: receiver, // list of receivers
//       subject: 'Hello ✔', // Subject line
//       text: 'Hello world?', // plain text body
//       html: '<b>Hello world?</b>', // html body
//     });

//     return res.status(httpStatus.OK).json({ messageId: info.messageId });
//   } catch (err) {
//     next(err);
//   }
// };
