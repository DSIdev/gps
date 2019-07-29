const mongoose = require("mongoose");
const User = require("./User");
const schemaOptions = { discriminatorKey: "userType" };

// ADMIN
const adminSchema = new mongoose.Schema(
  {
    authCode: {
      type: String,
      minlength: 8
    }
  },
  schemaOptions
);

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
