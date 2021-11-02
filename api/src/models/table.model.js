const mongoose = require('mongoose');

const { Schema } = mongoose;

const TableSchema = new Schema({
  tableNumber: {
    type: Number,
    unique: true,
  },
  status: {
    type: String,
    default: 'active',
    enum: [
      'active',
      'deactive',
    ],
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Table', TableSchema);
