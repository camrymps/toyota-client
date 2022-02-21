'use strict'

const _ = require('underscore')
const querystring = require('querystring')
const urlJoin = require('url-join')
const async = require('async')
require('promise')
const unirest = require('unirest')
const requestHandler = require('unirest-request-handler')

const Helpers = require('./lib/Helpers')
const Vehicle = require('./lib/Vehicle')
const Dealer = require('./lib/Dealer')
const Grade = require('./lib/Grade')
const Trim = require('./lib/Trim')

const fs = require('fs')

/**
 * Builds and executes a request.
 *
 * @param {string} path The request's path
 * @param {Object} params The request's parameters
 *
 * @returns {Promise.<Object|Error>} The responses' body if fulfilled,
 * or an error if rejected
 *
 */
var doRequest = function (path, params) {
  let endpoint = Helpers.absoluteURL(path + '?' + querystring.stringify(params))
  return requestHandler.handle(unirest.get(endpoint))
}

/**
 * Client constructor.
 * @constructor
 *
 */
var ToyotaClient = function () {
  /**
   * Removes duplicate vehicle model years.
   * @private
   * 
   * @param {Object[]} generations An array of a vehicle's generations
   * 
   * @returns An array of vehicle's generations
   */
  let removeDuplicateModelYears = function (generations) {
    let modelYears = []

    for (let i = 0; i < generations.length; i++) {
      let generation = generations[i]

      if (modelYears.includes(generation.modelYear)) {
        generations = generations.splice(i, 1)
      } else {
        modelYears.push(generation.modelYear)
      }
    }

    return generations
  }

  /**
   * Generates well-organized, response-ready data on all vehicles.
   * @private
   *
   * @param {Vehicle[]} vehicles An array of vehicle objects
   *
   * @returns An array of formatted vehicle data
   *
   */
  let formatAllVehicleData = function (vehicles) {
    if (vehicles.length > 1) {
      // filter out empty data
      let filtered = _.filter(vehicles, function (vehicle) {
        return !_.isEmpty(vehicle) && typeof vehicle.grades !== 'undefined'
      })

      // group vehicles by name
      let groups = _.groupBy(filtered, 'name')

      return _.map(groups, function (vehicle) {
        // parse generations
        let gens = _.map(vehicle, function (gen) {
          return { year: gen.year, grades: gen.grades }
        })
        // concat data
        return _.extend({
          type: vehicle[0].type,
          name: vehicle[0].name,
          image: vehicle[0].image
        }, {
          generations: gens
        })
      })
    }

    return vehicles[0]
  }

  /**
   * Parses raw data on one or more vehicle(s).
   * @private
   *
   * @param {Object} data Raw data on vehicle(s)
   *
   * @returns {Promise.<Vehicle[]|Error>} An array of formatted vehicle data if fulfilled,
   * or an error if rejected
   *
   */
  let parseVehicles = function (data, callback) {
    async.map(data, function (vehicleData, callback) {
      if (vehicleData.modelYear >= (new Date()).getFullYear() - 1) {
        // create vehicle object
        let vehicle = new Vehicle(vehicleData).getAll()

        // get vehicle's grades
        getGrades(vehicle)
          .then(function (grades) {
            // add combined vehicle data to mapped array
            callback(null, _.extend(vehicle, grades))
          })
          .catch(callback)
      } else callback(null, {})
    }, function (err, vehicles) {
      if (err) callback(err, null)
      else callback(null, formatAllVehicleData(vehicles))
    })
  }

  /**
   * Gets all vehicles.
   *
   * @returns {Promise.<Vehicle[]|Error>} An array of all vehicles if fulfilled,
   * or an error if rejected
   *
   */
  this.getAllVehicles = function () {
    return doRequest('ToyotaSite/rest/lscs/getDocument', {
      templatePath: 'templatedata/TComVehiclesData/Series/data/CombinedSeries.xml'
    })
      .then(function (vehiclesData) {
        return new Promise(function (resolve, reject) {
          parseVehicles(vehiclesData.Root.Series, function (err, vehicles) {
            if (err) reject(err)
            else resolve(vehicles)
          })
        })
      })
      .catch(function (err) {
        throw err
      })
  }

  /**
   * Gets a specific vehicle.
   *
   * @param {string} model The vehicle's name
   * @param {number} [year] The vehicle's year
   *
   * @returns {Promise.<Object[]|Error>} An array of the specified vehicle's generations if
   * fulfilled, or an error if rejected
   *
   */
  this.getVehicle = function (model, year) {
    return doRequest('ToyotaSite/rest/lscs/getDocument', {
      templatePath: 'templatedata/TComVehiclesData/Series/data/CombinedSeries.xml'
    })
      .then(function (vehiclesData) {
        let vehicleGens = _.where(vehiclesData.Root.Series,
          (year ? { modelName: model, modelYear: parseInt(year) } : { modelName: model })
        )

        // remove duplicate model years
        removeDuplicateModelYears(vehicleGens)

        return new Promise(function (resolve, reject) {
          parseVehicles(vehicleGens, function (err, vehicles) {
            if (err) reject(err)
            else resolve(vehicles)
          })
        })
      })
      .catch(function (err) {
        throw err
      })
  }

  /**
   * Gets a vehicle's grades and trims.
   * @private
   *
   * @param {Vehicle} vehicle The vehicle's object
   *
   * @returns {Promise.<Grade[]|Error>} An array of the specified vehicle's grades and trims if
   * fulfilled, or an error if rejected
   *
   */
  let getGrades = function (vehicle) {
    return doRequest('ToyotaSite/rest/lscs/getDocument', {
      templatePath: urlJoin('templatedata/TComVehiclesData/VehicleTrim/data/', vehicle.year.toString(), vehicle.name.toLowerCase(), '.xml')
    })
      .then(function (data) {
        if (data.Root) {
          let grades = _.map(data.Root.ModelGrades, function (gradeData) {
            let grade = new Grade(gradeData).getAll()
            let trims = _.map(gradeData.VehicleTrims, function (trimData) {
              let trim = new Trim(trimData).getAll()

              // determine trim's drivetrain
              let drivetrain = ''
              if (/FWD/.test(trim.name) || /4x2/.test(trim.name) || /2WD/.test(trim.name)) drivetrain = 'FWD'
              else if (/AWD/.test(trim.name) || /4x4/.test(trim.name) || /4WD/.test(trim.name)) drivetrain = 'AWD'
              else if (/RWD/.test(trim.name)) drivetrain = 'RWD'
              else drivetrain = _.last(vehicle.drivetrain)

              return _.extend(trim, { drivetrain: drivetrain })
            })
            return _.extend(grade, { trims: trims })
          })
          return { grades: grades }
        } else return {}
      })
      .catch(function (err) {
        throw err
      })
  }

  /**
   * Gets a list of dealers near a location.
   *
   * @param {number} zipCode A zip code
   *
   * @returns {Promise.<Object[]|Error>} An array of dealers near the specified zip code if
   * fulfilled, or an error if rejected
   *
   */
  this.getDealers = function (zipCode) {
    return doRequest('ToyotaSite/rest/dealerLocator/locateDealers', {
      brandId: 1,
      zipCode: zipCode
    })
      .then(function (data) {
        return _.map(data.dealers, function (dealerData) {
          return new Dealer(dealerData).getAll()
        })
      })
      .catch(function (err) {
        throw err
      })
  }
}

module.exports = ToyotaClient
