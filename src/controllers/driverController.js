// External Dependancies
const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

// Get Data Models
const Driver = require("../models/Driver");

// Import dependent upon services
const driverService = require("../services/driver");

// Get all drivers
exports.getDrivers = async (req, reply) => {
  reply.send(await driverService.getAllDrivers());
};

// Get single driver by ID
exports.getSingleDriver = async (req, reply) => {
  const driverID = req.params.id;
  reply.send(await driverService.getDriverById(driverID));
};

// Add a new driver
exports.addDriver = async (req, reply) => {
  try {
    const driver = await new Driver(req.body).save();
    return driver._id;
  } catch (err) {
    const error = MongooseHelper.parseError(err);
    return reply.send(new createError(error));
  }
};

// Update an existing driver
exports.updateDriver = async (req, reply) => {
  try {
    const id = req.params.id;
    const driver = req.body;
    const { ...updateData } = driver;
    const update = await Driver.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    return reply.send(new createError(err));
  }
};

// Delete a driver
exports.deleteDriver = async (req, reply) => {
  try {
    const id = req.params.id;
    const driver = await Driver.findByIdAndRemove(id);
    return driver;
  } catch (err) {
    return reply.send(new createError(err));
  }
};
