const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = require('bluebird');

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

if (config.env === 'development') {
  mongoose.set('debug', true);
}

exports.connect = () => {
  const mongoURI = config.mongo.uri;

  mongoose.connect(mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoose.connection;
};
