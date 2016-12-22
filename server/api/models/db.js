const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/vocalize';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose has connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connect error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose has disconnected');
});

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For normal app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For heroku shutdown
process.on('SIGTERM', function() {
  gracefulShutdown('heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./posts');
require('./users');
