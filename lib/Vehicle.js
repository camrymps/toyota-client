'use strict'

const _ = require('underscore')

/**
 * Represents a vehicle.
 * @constructor
 *
 * @param {Object} data The vehicle's raw data
 *
 */
var Vehicle = function (data) {
  this.vehicle = data
}

/**
 * Gets all of the vehicle's data.
 *
 * @return {Object} The vehicle's (formatted) data
 *
 */
Vehicle.prototype.getAll = function () {
  return {
    type: this.getType(),
    name: this.getName(),
    year: this.getYear(),
    drivetrain: this.getDrivetrain()
  }
}

/**
 * Gets the vehicle's type.
 * ex: SUV, sedan, minivan, etc.
 *
 * @return {string} The vehicle's type
 *
 */
Vehicle.prototype.getType = function () {
  let types = this.vehicle.modelCategory.split(',')

  if (types.length > 1) return types[1].trim()
  if (types.length === 1 && types[0].indexOf('-') >= 0) return types[0].split('-')[0]

  return types
}

/**
 * Gets the vehicle's name.
 *
 * @return {string} The vehicle's name
 *
 */
Vehicle.prototype.getName = function () {
  return this.vehicle.modelName
}

/**
 * Gets the vehicle's year.
 *
 * @return {number} The vehicle's production year
 *
 */
Vehicle.prototype.getYear = function () {
  return this.vehicle.modelYear
}

/**
 * Gets the vehicle's available drivetrain(s).
 * ex: FWD, RWD, AWD, etc.
 *
 * @return {Object} An array of one or more drivetrains
 *
 */
Vehicle.prototype.getDrivetrain = function () {
  return _.map(this.vehicle.DriveTrain.split(','), function (drivetrain) {
    return drivetrain.trim()
  })
}

module.exports = Vehicle
