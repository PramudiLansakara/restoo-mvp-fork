const mongoose = require('mongoose');

const { Schema } = mongoose;

const reservationSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  personCount: {
    type: String,
  },
  note: {
    type: String,
  },
  reservationStatus: {
    type: String,
    default: 'pending',
    enum: [
      'pending',
      'accepted',
      'declined',
    ],
  },
  adminNote: {
    type: String,
    default: 'N/A',
  },
  tableNumber: {
    type: String,
    default: 'N/A',
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Reservation', reservationSchema);
