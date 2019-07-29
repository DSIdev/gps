const mongoose = require("mongoose");
const User = require("./User");
const schemaOptions = { discriminatorKey: "userType" };

// DRIVER
const driverSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      default: "XXXXXXXX"
    }
  },
  schemaOptions
);

const Driver = User.discriminator("Driver", driverSchema);

module.exports = Driver;
