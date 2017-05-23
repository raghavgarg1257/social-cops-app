'use strict';

var url = require('url');

var Jsonpatch = require('./JsonpatchService');

module.exports.applyJsonPatch = function applyJsonPatch (req, res, next) {
  Jsonpatch.applyJsonPatch(req.swagger.params, res, next);
};
