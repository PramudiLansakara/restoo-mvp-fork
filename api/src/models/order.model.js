const { number } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  note: {
    type: String,
  },
  adminNote: {
    type: String,
  },
  orderType: {
    type: String,
  },
  currency: {
    type: String,
  },
  reference: {
    type: String,
    unique: true,
  },
  total: {
    type: Number,
  },
  deliveryCharge: {
    type: Number,
  },
  discount: {
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
    priceDetails:{
      id: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
    name: {
      type: String,
    },
  }],
  status: {
    type: String,
    default: 'waiting',
    enum: [
      'waiting',
      'accepted',
      'declined',
    ],
  },
  customer: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
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
