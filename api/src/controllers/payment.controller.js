const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Js3YUEhEKYau5wJnBdGxvbZFRGG28OzdbHfQ51P6VhRvwywCn4HTsn3brRM0377wfsECgreyHbe4ZCsHe2xOyNr00nwZxQ4q6');
const httpStatus = require('http-status');
// const APIError = require('../utils/APIError');

// exports.get = async (req, res, next) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'eur',
//           unit_amount: 4000,
//           product_data: {
//             name: 'ramen',
//           },
//         },
//         quantity: 1,
//       },
//       {
//         price_data: {
//           currency: 'eur',
//           unit_amount: 2000,
//           product_data: {
//             name: 'sweets',
//           },
//         },
//         quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: 'http://localhost:3000',
//       cancel_url: 'http://localhost:3000',
//     });

//     return res.send(session);
//   } catch (err) {
//     next(err);
//   }
// };

exports.create = async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000',
      cancel_url: 'http://localhost:3000',
    });

    return res.status(httpStatus.CREATED).json({ id: session.id });
  } catch (err) {
    next(err);
  }
};
