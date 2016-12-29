const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required."
    });
    return;
  }

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        "token": token
      });
    }
  });
};


module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.password) {
    sendJsonResponse(res, 400, {
      "message": "All fields required."
    });
    return;
  }

  passport.authenticate('local', function(err, user, info) {
    var token;

    console.log(info);

    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      sendJsonResponse(res, 200, {
        "token": token
      });
    } else {
      sendJsonResponse(res, 401, info);
    }
  })(req, res);
};
