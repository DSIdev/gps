const mongoose = require("mongoose");
const User = require("./User");
const schemaOptions = { discriminatorKey: "userType" };

// TRANSPORTER
const transporterSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      minlength: 5,
      maxlength: 60
    },
    vehicles: [
      {
        vehicleID: {
          type: String,
          required: true,
          maxlength: 11
        },
        manufacturer: {
          type: String,
          maxlength: 10
        },
        insuranceExp: Date,
        permitExp: Date
      }
    ]
  },
  schemaOptions
);

const Transporter = User.discriminator("Transporter", transporterSchema);

module.exports = Transporter;
