'use strict'

const _ = require('underscore')

/**
 * Represents a car dealer.
 * @constructor
 *
 * @param {Object} dealer The dealership's raw data
 *
 */
var Dealer = function (data) {
  this.dealer = data
  this.departments = [
    'sales',
    'service',
    'parts',
    'finance',
    'general'
  ]
}

/**
 * Get all of the dealership's data.
 *
 * @return {Object} The dealership's (formatted) data
 *
 */
Dealer.prototype.getAll = function () {
  return {
    name: this.getName(),
    address: this.getAddress(),
    city: this.getCity(),
    state: this.getState(),
    zip_code: this.getZipCode(),
    phone_numbers: this.getPhoneNumbers(),
    hours: this.getHours(),
    website_url: this.getWebsiteURL(),
    email_address: this.getEmailAddress()
  }
}

/**
 * Get the dealership's name.
 *
 * @return {string} The dealership's name
 */
Dealer.prototype.getName = function () {
  return this.dealer.name
}

/**
 * Get the dealership's street address.
 *
 * @return {string} The dealership's street address
 *
 */
Dealer.prototype.getAddress = function () {
  return this.dealer.address1
}

/**
 * Get the city the dealer is located in.
 *
 * @return {string} The city the dealer is located in
 *
 */
Dealer.prototype.getCity = function () {
  return this.dealer.city
}

/**
 * Get the state the dealer is located in.
 *
 * @return {string} The state the dealer is located in
 *
 */
Dealer.prototype.getState = function () {
  return this.dealer.state
}

/**
 * Get the zip code of the dealer.
 *
 * @return {number} The dealership's zip code
 *
 */
Dealer.prototype.getZipCode = function () {
  return this.dealer.zip
}

/**
 * Get the phone numbers of each department in the dealership.
 *
 * @return {Object} The phone numbers of each department in the dealership
 *
 */
Dealer.prototype.getPhoneNumbers = function () {
  let self = this
  return _.object(self.departments, _.map([
        (_.isUndefined(this.dealer.sales) || isNaN(this.dealer.sales.phone) ? null : this.dealer.sales.phone),
        (_.isUndefined(this.dealer.service) || isNaN(this.dealer.service.phone) ? null : this.dealer.service.phone),
        (_.isUndefined(this.dealer.parts) || isNaN(this.dealer.parts.phone) ? null : this.dealer.parts.phone),
        (_.isUndefined(this.dealer.finance) || isNaN(this.dealer.finance.phone) ? null : this.dealer.finance.phone),
        (_.isUndefined(this.dealer.general) || isNaN(this.dealer.general.phone) ? null : this.dealer.general.phone)
  ], function (number) {
    if (number !== null) {
      return parseInt(number.toString().trim().replace(/\(\)-/, ''))
    } else return null
  }))
}

/**
 * Get the hours of each department in the dealership.
 *
 * @return {Object} The hours of each department in the dealership
 *
 */
Dealer.prototype.getHours = function () {
  let weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  return _.object(this.departments, _.map([
        (_.isUndefined(this.dealer.sales) ? null : this.dealer.sales.hours),
        (_.isUndefined(this.dealer.service) ? null : this.dealer.service.hours),
        (_.isUndefined(this.dealer.parts) ? null : this.dealer.parts.hours),
        (_.isUndefined(this.dealer.finance) ? null : this.dealer.finance.hours),
        (_.isUndefined(this.dealer.general) ? null : this.dealer.general.hours)
  ], function (times) {
    times = _.flatten(_.without(times, null))
    if (times.length > 0) {
      return _.map(times, function (set, index) {
        let weekday = weekdays[index]
        let keys = [
          'day',
          'from',
          'to'
        ]
        if (set === 'Closed') {
          return _.object(keys, [weekday, null, null])
        } else {
          return _.object(keys, _.flatten([weekday, set.split(',')]))
        }
      })
    } else return null
  }))
}

/**
 * Get the dealership's website URL (if it exists).
 *
 * @return The dealership's website URL
 *
 */
Dealer.prototype.getWebsiteURL = function () {
  return this.dealer.url
}

/**
 * Get the dealership's email address (if it exists).
 *
 * @return The dealership's email address
 *
 */
Dealer.prototype.getEmailAddress = function () {
  return this.dealer.email
}

module.exports = Dealer
