// External Dependancies
const mongoose = require("mongoose");
const schemaOptions = { discriminatorKey: "userType" };
const userSchema = new mongoose.Schema(
  {
    contactName: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20
    },
    username: {
      type: String,
      required: true,
      immutable: true
    },
    encpwd: {
      type: String,
      required: true,
      minlength: 20
    },
    roles: {
      type: String,
      required: true,
      enum: ["ADMIN", "HUB-AGENT", "TRANSPORTER", "DRIVER", "DISABLED"],
      default: "DISABLED"
    },
    salt: {
      type: String,
      required: true,
      minlength: 16
    },
    phone: {
      type: String,
      minlength: 10,
      maxlength: 10
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      maxlength: 40
    },
    address: {
      type: String,
      minlength: 20,
      maxlength: 60
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: "users",
    timestamps: { createdAt: "created", updatedAt: "modified" },
    ...schemaOptions
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
