'use strict'

const urlJoin = require('url-join')

const config = require('../config')

/**
 * Converts a relative URL into an absolute URL.
 *
 * @param {string} relativeURL The relative URL path
 *
 */
module.exports.absoluteURL = function (relativeURL) {
  return urlJoin(config.baseURL, relativeURL)
}
