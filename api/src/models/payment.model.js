const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  paymentMethod: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  status: {
    type: String,
    default: 'unpaid',
    enum: [
      'unpaid',
      'paid',
      'cancelled',
    ],
  },
  order: {
    type: Schema.ObjectId,
    ref: 'Order',
  },
  paidAt: {
    type: Date,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Payment', schema);
