// External Dependancies
const mongoose = require("mongoose");
const tripSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10
    },
    destination: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10
    },
    tripDate: {
      type: Date,
      required: true
    },
    estimatedArrivalTime: Date,
    status: {
      type: String,
      required: true,
      enum: ["BOOKED", "IN-PROGRESS", "HUB-HALT", "ENDED", "CANCELLED"],
      default: "BOOKED"
    },
    vehicleID: {
      type: String,
      required: true,
      immutable: true
    },
    drivers: [
      {
        driverID: {
          type: String,
          required: true
        },
        driverName: {
          type: String,
          required: true
        },
        checkInTime: {
          type: Date,
          required: true
        },
        checkOutTime: {
          type: Date,
          required: true
        }
      }
    ],
    location: [
      {
        lat: String,
        long: String,
        timestamp: Date,
        immutable: true
      }
    ],
    comments: [
      {
        text: String,
        author: String,
        timestamp: Date,
        immutable: true
      }
    ]
  },
  {
    collection: "trips",
    timestamps: { createdAt: "created", updatedAt: "modified" }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
/**
 * TRIP ENDPOINTS
 * /trip/create
 * /trip/updateDriver
 * /trip/updateStatus
 * /trip/updateLocation
 */
