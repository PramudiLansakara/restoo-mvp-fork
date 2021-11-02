const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const roles = [
  'user', 'waiter', 'admin',
];

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 128,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  active: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: roles,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
