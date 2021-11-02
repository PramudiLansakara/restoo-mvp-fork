const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('FoodCategory', categorySchema);
