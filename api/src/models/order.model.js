const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  note: {
    type: String,
  },
  orderType: {
    type: String,
  },
  reference: {
    type: String,
    unique: true,
  },
  total: {
    type: Number,
  },
  table: {
    type: Number,
  },
  items: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'FoodItem',
    },
    quantity: {
      type: Number,
    },
  }],
  status: {
    type: String,
    default: 'waiting',
    enum: [
      'waiting',
      'accepted',
      'preparing',
      'served',
      'completed',
      'cancelled',
    ],
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  waiter: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  placedAt: {
    type: Date,
  },
  acceptedAt: {
    type: Date,
  },
  servedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  cancelledAt: {
    type: Date,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Order', schema);
