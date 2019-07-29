const mongoose = require("mongoose");
const User = require("./User");
const schemaOptions = { discriminatorKey: "userType" };

// HUB AGENT
const hubAgentSchema = new mongoose.Schema(
  {
    hubName: {
      type: String,
      minlength: 10
    }
  },
  schemaOptions
);

const HubAgent = User.discriminator("HubAgent", hubAgentSchema);

module.exports = HubAgent;
