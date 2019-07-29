// Import Controllers
const driverController = require("../controllers/driverController");
const EntityController = require("../controllers/fetch");
const AuthController = require("../controllers/authController");

const fastify = require("fastify");

// Import Swagger documentation
// const documentation = require("./documentation/carApi");

const routes = [
  {
    method: "POST",
    url: "/api/:entityName",
    handler: EntityController.createEntity,
    secured: true
  },
  {
    method: "POST",
    url: "/api/login",
    handler: AuthController.login
  },
  {
    method: "POST",
    url: "/api/authenticate",
    handler: AuthController.authenticate,
    secured: true
  },
  {
    method: "GET",
    url: "/api/:entityName",
    handler: EntityController.getEntities,
    secured: true
  },
  {
    method: "GET",
    url: "/api/:entityName/:entityId",
    handler: EntityController.getSingleEntity,
    secured: true
  },
  // {
  //   method: "GET",
  //   url: "/api/driver/:id",
  //   handler: driverController.getSingleDriver,
  //   schema: {
  //     params: {
  //       type: "object",
  //       properties: {
  //         id: { type: "string" }
  //       }
  //     }
  //   }
  // },
  // {
  //   method: "POST",
  //   url: "/api/driver",
  //   handler: driverController.addDriver
  // },
  {
    method: ["HEAD", "PUT", "DELETE", "OPTIONS", "PATCH"],
    url: "/api/drivers",
    handler: async (req, reply) => {
      reply
        .code(405)
        .header("allow", "GET, POST")
        .send();
    }
  }
];

module.exports = routes;
