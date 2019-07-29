// External Dependancies
const mongoose = require("mongoose");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const MongooseHelper = require("../plugins/MongooseHelper");

// Data Models
User = require("../models/User");

exports.issueToken = async ({ username, userpwd }) => {
  const user = await User.findOne(
    { username },
    { roles: 1, isActive: 1, userType: 1, username: 1, salt: 1, encpwd: 1 }
  );
  return new Promise(function(resolve, reject) {
    bcrypt.hash(userpwd, user.salt, function(err, hash) {
      if (hash === user.encpwd) {
        resolve();
      } else {
        reject(new createError.Unauthorized());
      }
    });
  })
    .then(() => {
      const { roles, username, userType } = user;
      const claims = {
        roles,
        username,
        userType,
        exp: 1000 * 3600 * 24 * 30,
        aud: "TRANSFRONT"
      };
      return new Promise(function(resolve, reject) {
        JWT.sign(claims, user.salt, function(err, token) {
          if (err) reject(err);
          resolve(token);
        });
      });
    })
    .catch(ex => console.error(ex));
};

exports.verifyToken = async (req, response, next) => {
  if (!req.headers.authorization)
    throw new createError.Unauthorized("Auth token missing");
  let decoded = null;
  const token = req.headers.authorization;
  return new Promise(async (resolve, reject) => {
    decoded = JWT.decode(token, { complete: true });

    if (!decoded.payload.username)
      reject(new createError.Unauthorized("Token missing required params"));
    let user = null;
    try {
      user = await User.findOne(
        { username: decoded.payload.username },
        { roles: 1, isActive: 1, userType: 1, username: 1, salt: 1, encpwd: 1 }
      );
    } catch (e) {
      return new createError(e);
    }

    if (!user)
      reject(new createError.Unauthorized("Invalid user access attempted"));

    JWT.verify(token, user.salt, function(err, verifiedToken) {
      if (err) reject(new createError.Unauthorized(err.message));

      if (!req.body) req.body = {};
      req.body.verifiedToken = verifiedToken;

      resolve(true);
    });
  });
};
