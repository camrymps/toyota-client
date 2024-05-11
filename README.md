# Toyota API Client

## Currently a WIP

<s>An unofficial API client that retrieves data on Toyota vehicles, directly from [toyota.com](https://toyota.com).

## Requirements
[Node.js](https://nodejs.org/en/)

## Installation
```javascript
npm install toyota-client
```

## Usage
Setting up a client instance is simple:
```javascript
const Toyota = require('toyota-client');
const client = new Toyota();
```

## Methods

### Get all vehicles
#### `getAllVehicles()`
#### Example response [here](https://github.com/camrymps/toyota-client/blob/master/examples/responses/getAllVehicles.json).
This method gets all Toyota vehicles.
```javascript
client
    .getAllVehicles()
    .then(function(vehicles) {
        // ...
    })
    .catch(function(err) {
        throw err;
    });
```

### Get a vehicle
#### `getVehicle(model[, year])`
#### Example response with year [here](https://github.com/camrymps/toyota-client/blob/master/examples/responses/getVehicle_with_year.json) and without year [here](https://github.com/camrymps/toyota-client/blob/master/examples/responses/getVehicle_without_year.json).
This method gets a specific Toyota vehicle. If a year is not specified, all generations of the vehicle model will be returned. If a year is specified, that year's vehicle model will be returned.
```javascript
client
    .getVehicle('Corolla')
    .then(function(generations) {
        // ...
    })
    .catch(function(err) {
        throw err;
    });
```
or 
```javascript
client
    .getVehicle('Corolla', 2022)
    .then(function(generation) {
        // ...
    })
    .catch(function(err) {
        throw err;
    });
```

### Get information on Toyota dealers
#### `getDealers(zipCode)`
#### Example response [here](https://github.com/camrymps/toyota-client/blob/master/examples/responses/getDealers.json).
This method gets Toyota dealers near a certain zip code.
```javascript
client
    .getDealers(53075)
    .then(function(dealers) {
        // ...
    })
    .catch(function(err) {
        throw err;
    })
```

## Tests
To run the existing tests, simply issue the following command:
```javascript
npm test
```

## Disclaimer
This client retrieves data directly from Toyota's website, but is not an "official" Toyota client. This is meant to be used for learning purposes only. **Use at your own risk.**
</s>