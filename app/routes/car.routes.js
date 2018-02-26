module.exports = function(app) {
    var cars = require('../controllers/car.controller.js');

    // create a new car
    app.post('/cars', cars.create);

    //retrieve all cars
    app.get('/cars', cars.findAll);

    //retrieve a single car with carId
    app.get('/cars/:carId', cars.findOne);

    //update a car with carId
    app.put('cars/:carId', cars.update);

    //delete a car with carId
    app.delete('cars/:carId', cars.delete);
}