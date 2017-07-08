// Client setup
const Toyota = require('../index')
const client = new Toyota()

// Chai setup
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

// Dealer tests
describe('Dealer', function () {
  it('should get dealer\'s information with zip code 53075', function () {
    client
            .getDealers(53075)
            .should
            .eventually
            .be
            .fulfilled
  })
})

// Vehicle tests
describe('Vehicle', function () {
  it('should get data on all Toyota vehicles', function () {
    client
            .getAllVehicles()
            .should
            .eventually
            .be
            .fulfilled
  })

  it('should get data on all generations of the Toyota Corolla', function () {
    client
            .getVehicle('Corolla')
            .should
            .eventually
            .be
            .fulfilled
  })

  it('should get data on the 2017 Toyota Corolla', function () {
    client
            .getVehicle('Corolla', 2017)
            .should
            .eventually
            .be
            .fulfilled
  })

  it('should get data on the grades of the 2017 Toyota Corolla', function () {
    client
            .getGrades('Corolla', 2017)
            .should
            .eventually
            .be
            .fulfilled
  })
})
