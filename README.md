# Toyota API Client

An "unofficial" API client that retrieves data on Toyota vehicles, directly from [toyota.com](https://toyota.com).

## Installation
```javascript
npm install toyota-client
```

## Usage
Setting up a client instance is simple:
```javascript
const ToyotaClient = require('toyota-client');
const client = new ToyotaClient();
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
    .getVehicle('Corolla', 2017)
    .then(function(generation) {
        // ...
    })
    .catch(function(err) {
        throw err;
    });
```

### Get a vehicle's grade
**NOTE: The getGrades() method has been deprecated as of version 0.0.6. If you want to get a vehicle's grades, simply use either the getAllVehicles() method or the getVehicle() method.**
#### ~~`getGrades(model, year)`~~
#### ~~Example response here.~~
~~This method gets the grades and trims of a specific vehicle. For example, the Toyota 4Runner has 6 different grades: SR5, SR5 Premium, TRD Off-Road, TRD Off-Road Premium, Limited, and TRD Pro. Each grade has one or more trims. For example, the "Limited" grade has two different trims: 4x2 4.0L V6 5-Speed Automatic and 4x4 4.0L V6 5-Speed Automatic.~~
```javascript
/* client
    .getGrades('4Runner', 2016)
    .then(function(grades) {
        // ...
    })
    .catch(function(err) {
        throw err;
    }) */
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

## License
Copyright (c) 2017 Michael Scott. Licensed under the MIT license.

## Disclaimer
This client retrieves data directly from Toyota's website, but is not an "official" Toyota client. This is meant to be used for learning purposes only. **Use at your own risk.**