const mongoose = require('mongoose');

const { Schema } = mongoose;
const urlJoin = require('url-join');
const config = require('../config');

function getFullPath(bannerImg) {
  if (bannerImg) {
    return urlJoin(config.mediahost, bannerImg.toString());
  }
}

const itemSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  prices: [{
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'LKR',
    },
  }],
  discountPrice: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.ObjectId,
    ref: 'FoodCategory',
  },
  todaySpecial: {
    type: Boolean,
    default: false,
  },
  itemUrl: {
    type: String,
    get: getFullPath,
    set: (v) => v.replace(config.mediahost, ''),
  },
}, {
  timestamps: false,
});

itemSchema.set('toObject', { getters: true });

itemSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('FoodItem', itemSchema);
