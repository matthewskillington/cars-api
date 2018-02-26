var Car = require('../models/car.model.js');

exports.create = function (req, res) {
    //Create a new car

    //Validation
    if(!req.body.id) {
        return res.status(400).send({message: "Car can not be empty"});
    }

    //create the object
    var car = new Car({
        id: req.body.id || 0, 
        manufacturer: req.body.manufacturer, 
        model: req.body.model, 
        power: req.body.power, 
        price: req.body.price, 
        imageUrl: req.body.imageUrl
    });

    car.save(function(err, data){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occured whilst creating the car"});
        }
        else {
            res.send(data);
        }
    });
}

exports.findAll = function (req, res) {
    //Retrieve and return all cars from the database
    Car.find(function(err, cars){
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occured while retrieving carss."});
        }
        else {
            res.send(cars);
        }
    });
}

exports.findOne = function(req, res) {
    //Find a single car with carId
    Car.findById(req.params.carId, function(err, car){
        if (err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Car not found with id" + req.params.carId});
            }
            return res.status(500).send({message: "Error retrieving car with id" + req.params.carId});
        }
        if (!car) {
            return res.status(404).send({message: "Car not found with id" + req.params.carId});
        }

        res.send(car);
    });
}

exports.update = function(req, res) {
    // Update a car identified by the carId in the request
    Car.findById(req.params.carId, function(err, car) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Car not found with id " + req.params.carId});                
            }
            return res.status(500).send({message: "Error finding car with id " + req.params.carId});
        }

        if(!car) {
            return res.status(404).send({message: "Car not found with id " + req.params.carId});            
        }

        car.id = req.body.id;
        car.manufacturer = req.body.manufacturer;
        car.model = req.body.model;
        car.power = req.body.power;
        car.price = req.body.price;
        car.imageUrl = req.body.imageUrl;

        car.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update car with id " + req.params.carId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a car with the specified carId in the request
    Car.findByIdAndRemove(req.params.carId, function(err, car) {
        if(err) {
            console.log(err);
            if(err.kind === 'ObjectId') {
                return res.status(404).send({message: "Car not found with id " + req.params.carId});                
            }
            return res.status(500).send({message: "Could not delete car with id " + req.params.carId});
        }

        if(!car) {
            return res.status(404).send({message: "Car not found with id " + req.params.carId});
        }

        res.send({message: "Car deleted successfully!"})
    });
};