const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

const EventEmitter = require("events").EventEmitter;
let emitter = new EventEmitter();

// Get Data Models
const Driver = require("../models/Driver");

exports.subscribe = emitter;

const eventList = {
  getAll: "DRIVER_GET_ALL",
  getOne: "DRIVER_GET_ONE",
  added: "DRIVER_ADDED"
};
exports.events = eventList;
exports.getAllDrivers = async () => {
  const sampleSize = 2;
  try {
    const drivers = await Driver.find()
      .lean()
      .limit(sampleSize);
    emitter.emit(eventList.getAll, { entity: "DRIVER" });
    return drivers;
  } catch (err) {
    return new createError(err);
  }
};

exports.getDriverById = async driverID => {
  if (!mongoose.Types.ObjectId.isValid(driverID)) {
    return new createError.BadRequest("Invalid ID");
  }
  try {
    const driver = await Driver.findById(driverID);
    if (!driver) return new createError.NotFound("Unknown ID");
    return driver;
  } catch (err) {
    return new createError(err);
  }
};

exports.postDriver = async driverData => {
  if (!driverData)
    return new createError.BadRequest("Missing required parameters.");
  try {
    const driverID = await Driver.save(driverData);
    return driverID;
  } catch (err) {
    return new createError(MongooseHelper.parseError(err));
  }
};

exports.updateDriver = async (driverID, driverData) => {
  if (!driverData)
    return new createError.BadRequest("Missing required parameters.");
  try {
    const driverID = await Driver.findByIdAndUpdate(driverID, driverData, {
      lean: true
    });
    return driverID;
  } catch (err) {
    return new createError(MongooseHelper.parseError(err));
  }
};
