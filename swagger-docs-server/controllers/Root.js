'use strict';

var url = require('url');

var Root = require('./RootService');

module.exports.getRoot = function getRoot (req, res, next) {
  Root.getRoot(req.swagger.params, res, next);
};

module.exports.postRoot = function postRoot (req, res, next) {
  Root.postRoot(req.swagger.params, res, next);
};
