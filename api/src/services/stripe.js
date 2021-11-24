const Stripe = require('stripe');
const config = require('../config');

const stripe = Stripe(config.stripeSK);

module.exports = stripe;
