const mongoose = require('mongoose');
const urlJoin = require('url-join');
const config = require('../config');

const { Schema } = mongoose;

function getFullPath(bannerImg) {
  if (bannerImg) {
    return urlJoin(config.mediahost, bannerImg.toString());
  }
}
const categorySchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  categoryUrl: {
    type: String,
    get: getFullPath,
    set: (v) => v.replace(config.mediahost, ''),
  },
}, {
  timestamps: false,
});

categorySchema.set('toObject', { getters: true });

categorySchema.set('toJSON', { getters: true });

module.exports = mongoose.model('FoodCategory', categorySchema);
