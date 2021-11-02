const mongoose = require('mongoose');

const { Schema } = mongoose;
const urlJoin = require('url-join');
const config = require('../config');

function getFullPath(img) {
  return img ? urlJoin(config.mediahost, img.toString()) : img;
}

const eventSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  bannerImg: {
    type: String,
    get: getFullPath,
    set: (v) => v.replace(config.mediahost, ''),
  },
  time: {
    type: String,
  },
}, {
  timestamps: false,
});

eventSchema.set('toObject', { getters: true });

eventSchema.set('toJSON', { getters: true });

module.exports = mongoose.model('Event', eventSchema);
