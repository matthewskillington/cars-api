var Car = require('../models/car.model.js');

exports.create = function (req, res) {
    //Create a new car
    if(!req.body.content) {
        return res.status(400).send({message: "Car can not be empty"});
    }

    var car = new Car({title: req.body.title || "Untitled Car", content: req.body.content});

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

        car.title = req.body.title;
        car.content = req.body.content;

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