/* eslint-disable no-console */
const inquirer = require('inquirer');
const mongoose = require('../services/mongoose');
const User = require('../models/user.model');

const questions = [
  {
    type: 'input',
    name: 'email',
    message: 'Email:',
  },
  {
    type: 'password',
    name: 'password',
    message: 'Password:',
  },
  {
    type: 'input',
    name: 'phoneNumber',
    message: 'Phone Number:',
  },
];

inquirer.prompt(questions).then((answers) => {
  console.log(`Creating admin user for ${answers.email}`);
  mongoose.connect().then(async () => {
    const admin = new User({
      email: answers.email,
      password: answers.password,
      phoneNumber: answers.phoneNumber,
      role: 'admin',
      active: true,
    });
    await admin.save();
    console.log(`Created admin user: ${answers.email}`);
    process.exit(0);
  }).catch((err) => {
    console.error('Error adding admin user', err);
    process.exit(1);
  });
});
