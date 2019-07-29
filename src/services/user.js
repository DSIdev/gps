const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

const EventEmitter = require("events").EventEmitter;
let emitter = new EventEmitter();

// Get Data Models
const User = require("../models/User");

exports.subscribe = emitter;

const eventList = {
  getAll: "USER_GET_ALL",
  getOne: "USER_GET_ONE",
  added: "USER_ADDED"
};
exports.events = eventList;
exports.getAllUsers = async () => {
  const sampleSize = 2;
  let startTime = Date.now();
  try {
    const users = await User.find()
      .lean()
      .limit(sampleSize);
    emitter.emit(eventList.getAll, "USER_GET_ALL DATA");
    return users;
    // return [
    //   {
    //     queryTime: Date.now() - startTime,
    //     message: `Limiting to ${sampleSize} entries`
    //   },
    //   ...users
    // ];
  } catch (err) {
    return new createError(err);
  }
};

exports.getUserById = async userID => {
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return new createError.BadRequest("Invalid ID");
  }
  try {
    const user = await User.findById(userID);
    if (!user) return new createError.NotFound("Unknown ID");
    return user;
  } catch (err) {
    return new createError(err);
  }
};
