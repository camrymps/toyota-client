'use strict'

const _ = require('underscore')

const Helpers = require('./Helpers')

/**
 * Represents a vehicle's trim.
 * @constructor
 *
 * @param {Object} data The vehicle trim's raw data
 *
 */
var Trim = function (data) {
  this.trim = data
}

/**
 * Get all of the trim's data.
 *
 * @return {Object} The trim's (formatted) data
 *
 */
Trim.prototype.getAll = function () {
  return {
    name: this.getName(),
    image: this.getImage(),
    msrp: this.getMSRP(),
    transmission: this.getTransmission(),
    max_seating: this.getMaxSeating(),
    engine: this.getEngine(),
    city_mpg: this.getCityMPG(),
    highway_mpg: this.getHighwayMPG()
  }
}

/**
 * Get the trim's name.
 * ex: 4x2 Premium 4.0L V6 5-Speed Automatic, 4x4 Premium 4.0L V6 5-Speed Automatic, etc.
 *
 * @return {string} The trim's name
 *
 */
Trim.prototype.getName = function () {
  return this.trim.trimName
}

/**
 * Get the trim's image URL.
 *
 * @return {string} The trim's image (absolute) URL
 *
 */
Trim.prototype.getImage = function () {
  return Helpers.absoluteURL(this.trim.resptrimImage)
}

/**
 * Get the trim's MSRP.
 *
 * @return {number} The trim's MSRP
 *
 */
Trim.prototype.getMSRP = function () {
  return this.trim.msrp
}

/**
 * Get the trim's transmission type.
 *
 * @return {string} The trim's transmission type
 *
 */
Trim.prototype.getTransmission = function () {
  return this.trim.Transmission
}

/**
 * Get the trim's maximum number of seats.
 *
 * @return {number} The trim's maximum number of seats
 *
 */
Trim.prototype.getMaxSeating = function () {
  let seating = this.trim.seating
  return typeof seating === 'string' ? parseInt(_.max(seating.split(','), function (count) {
    return parseInt(count.trim())
  }).trim()) : seating
}

/**
 * Get the trim's engine type.
 * ex: 4-cylinder, 6-cylinder, etc.
 *
 * @return {string} The trim's engine type
 *
 */
Trim.prototype.getEngine = function () {
  return this.trim.Engine
}

/**
 * Get the trim's city miles per gallon.
 *
 * @return {number} The trim's city miles per gallon
 *
 */
Trim.prototype.getCityMPG = function () {
  return this.trim.cityMPG
}

/**
 * Get the trim's highway miles per gallon.
 *
 * @return {number} The trim's highway miles per gallon
 *
 */
Trim.prototype.getHighwayMPG = function () {
  return this.trim.hwyMPG
}

module.exports = Trim
