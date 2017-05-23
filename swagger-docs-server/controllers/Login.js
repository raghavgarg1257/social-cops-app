'use strict';

var url = require('url');

var Login = require('./LoginService');

module.exports.loginUser = function loginUser (req, res, next) {
  Login.loginUser(req.swagger.params, res, next);
};
