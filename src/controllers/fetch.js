// External Dependancies
const createError = require("http-errors");

// Import dependent upon services
const EntityService = require("../services/fetch");

// Get all entities
exports.getEntities = async (req, reply) => {
  const entityName = req.params.entityName;
  reply.send(await EntityService.getAllEntities(entityName));
};

// Get single entity by ID
exports.getSingleEntity = async (req, reply) => {
  const { entityName, entityId } = req.params;
  reply.send(await EntityService.getEntityById(entityName, entityId));
};

// Create single entity
exports.createEntity = async (req, reply) => {
  const { entityName } = req.params;
  const token = req.body.verifiedToken;
  const entityData = { ...req.body, verifiedToken: null };
  reply.send(await EntityService.createEntity(entityData, req.headers));
};
