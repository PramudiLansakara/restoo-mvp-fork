const mongoose = require('mongoose');

const { Schema } = mongoose;
const urlJoin = require('url-join');
const config = require('../config');

function getFullPath(img) {
  return img ? urlJoin(config.mediahost, img.toString()) : img;
}

const specialsSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  bannerImg: {
    type: String,
    get: getFullPath,
    set: (v) => v.replace(config.mediahost, ''),
  },
}, {
  timestamps: false,
});

specialsSchema.set('toObject', { getters: true });

specialsSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Specials', specialsSchema);
