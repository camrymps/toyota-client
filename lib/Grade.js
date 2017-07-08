'use strict'

const _ = require('underscore')

/**
 * Represents a vehicle's grade.
 * @constructor
 *
 * @param {Object} grade The vehicle grade's raw data
 *
 */
var Grade = function (data) {
  this.grade = data
}

/**
 * Get all of the grade's data.
 *
 * @return {Object} The grade's (formatted) data
 *
 */
Grade.prototype.getAll = function () {
  return {
    name: this.getName(),
    key_features: this.getKeyFeatures()
  }
}

/**
 * Get the grade's name.
 * ex: SR5, SE, etc.
 *
 * @return {string} The grade's name
 *
 */
Grade.prototype.getName = function () {
  return this.grade.modelGradeName
}

/**
 * Get the grade's key features.
 *
 * @return {Object} The grade's key features
 *
 */
Grade.prototype.getKeyFeatures = function () {
  return _.flatten(
        _.map(this.grade.KeyFeatures, function (feature) {
          return _.values(feature)
        })
    )
}

module.exports = Grade
