const mongoose = require('mongoose');

const { Schema } = mongoose;

const CitySchema = new Schema({
  city: {
    type: String,
  },
  deliveryCharge: {
    type: Number,
  },
  minAmount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('City', CitySchema);
