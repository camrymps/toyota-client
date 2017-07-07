'use strict'

const _ = require('underscore')
const querystring = require('querystring')
const urlJoin = require('url-join')
const async = require('async')
const promise = require('promise')
const unirest = require('unirest')
const requestHandler = require('unirest-request-handler')

const Helpers = require('./lib/Helpers')
const Vehicle = require('./lib/Vehicle')
const Dealer = require('./lib/Dealer')
const Grade = require('./lib/Grade')
const Trim = require('./lib/Trim')

/**
 * Builds and executes a request.
 * 
 * @param {string} path The request's path
 * @param {Object} params The request's parameters
 * 
 * @return {Promise.<Object|Error>} The responses' body if fulfilled,
 * or an error if rejected
 * 
 */
var doRequest = function(path, params) {
    let endpoint = Helpers.absoluteURL(path + '?' + querystring.stringify(params));
    return requestHandler.handle(unirest.get(endpoint));
}

/**
 * Client constructor.
 * @constructor
 * 
 */
var ToyotaClient = function() {
    let self = this;

    /**
     * Gets all vehicles.
     * 
     * @return {Promise.<Object[]|Error>} An array of all vehicles if fulfilled,
     * or an error if rejected
     * 
     */
    this.getAllVehicles = function() {
        return doRequest('ToyotaSite/rest/lscs/getDocument', {
                templatePath: 'templatedata/TComVehiclesData/Series/data/CombinedSeries.xml'
            })
            .then(function(vehiclesData) {
                return new Promise(function(resolve, reject) {
                    async.map(vehiclesData.Root.Series, function(vehicleData, callback) {
                        let vehicle = new Vehicle(vehicleData).getAll();

                        self.getGrades(vehicle.name, vehicle.year)
                            .then(function(grades) {
                                callback(null, _.extend(vehicle, grades));
                            })
                            .catch(callback);
                    }, function(err, vehicles) {
                        if (err) reject(err);
                        else resolve(vehicles);
                    });
                });
            })
            .catch(function(err) {
                throw err;
            });
    }

    /**
     * Gets a specific vehicle.
     * 
     * @param {string} model The vehicle's name
     * @param {number} [year] The vehicle's year
     * 
     * @return {Promise.<Object[]|Error>} An array of the specified vehicle's generations if
     * fulfilled, or an error if rejected
     * 
     */
    this.getVehicle = function(model, year) {
        return self.getAllVehicles()
            .then(function(vehiclesData) {
                return _.where(vehiclesData, (year ? { name: model, year: parseInt(year) } : { name: model }));
            })
            .catch(function(err) {
                throw err;
            });
    }

    /**
     * Gets a vehicle's grades and trims.
     * 
     * @param {string} model The vehicle's name
     * @param {number} year The vehicle's year
     * 
     * @return {Promise.<Object[]|Error>} An array of the specified vehicle's grades and trims if
     * fulfilled, or an error if rejected
     * 
     */
    this.getGrades = function(model, year) {
        return doRequest('ToyotaSite/rest/lscs/getDocument', {
                templatePath: urlJoin('templatedata/TComVehiclesData/VehicleTrim/data/', year, model.toLowerCase(), '.xml')
            })
            .then(function(data) {
                if (data) {
                    let grades = _.map(data.Root.ModelGrades, function(gradeData) {
                        let grade = new Grade(gradeData).getAll();
                        let trims = _.map(gradeData.VehicleTrims, function(trimData) {
                            return new Trim(trimData).getAll();
                        });

                        return { grade: _.extend(grade, { trims: trims }) };
                    });

                    return { grades: grades };
                }
            })
            .catch(function(err) {
                throw err;
            })
    }

    /**
     * Gets a list of dealers near a location.
     * 
     * @param {number} zipCode A zip code
     * 
     * @return {Promise.<Object[]|Error>} An array of dealers near the specified zip code if
     * fulfilled, or an error if rejected
     * 
     */
    this.getDealers = function(zipCode) {
        return doRequest('ToyotaSite/rest/dealerLocator/locateDealers', {
                brandId: 1,
                zipCode: zipCode
            })
            .then(function(data) {
                return _.map(data.dealers, function(dealerData) {
                    return new Dealer(dealerData).getAll();
                });
            })
            .catch(function(err) {
                throw err;
            });
    }

}

module.exports = ToyotaClient;