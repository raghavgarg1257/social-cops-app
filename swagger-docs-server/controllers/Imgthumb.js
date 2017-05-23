'use strict';

var url = require('url');

var Imgthumb = require('./ImgthumbService');

module.exports.createThumbnail = function createThumbnail (req, res, next) {
  Imgthumb.createThumbnail(req.swagger.params, res, next);
};
