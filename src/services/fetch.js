const mongoose = require("mongoose");
const createError = require("http-errors");
const MongooseHelper = require("../plugins/MongooseHelper");

// Setup event emitter
const EventEmitter = require("events").EventEmitter;
let emitter = new EventEmitter();
const eventList = {
  getAll: "GET_ALL",
  getOne: "GET_ONE",
  addOne: "ADDED"
};
exports.subscribe = emitter;
exports.events = eventList;

// Data Models
Admin = require("../models/Admin");
Driver = require("../models/Driver");
HubAgent = require("../models/HubAgent");
Transporter = require("../models/Transporter");

// Generic Entity
const Entity = {
  // URL friendly keys for entities
  admin: Admin,
  driver: Driver,
  hubagent: HubAgent,
  transporter: Transporter
};

exports.getAllEntities = async entityName => {
  const sampleSize = 2;
  let startTime = Date.now();
  try {
    const records = await Entity[entityName]
      .find()
      .lean()
      .limit(sampleSize);
    emitter.emit(`GET_ALL:${entityName}`);
    return records;
  } catch (err) {
    return new createError(err);
  }
};

exports.getEntityById = async (entityName, entityId) => {
  if (!mongoose.Types.ObjectId.isValid(entityId)) {
    return new createError.BadRequest("Invalid ID");
  }
  try {
    const record = await Entity[entityName].findById(entityId);
    if (!record) return new createError.NotFound("Unknown ID");
    return record;
  } catch (err) {
    return new createError(err);
  }
};

exports.createEntity = async (entityData, headers) => {
  return headers;
};
