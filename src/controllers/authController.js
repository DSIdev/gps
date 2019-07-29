// Services
const Auth = require("../services/Auth");

exports.login = async (req, reply) => {
  const { username, userpwd } = req.body;
  const token = await Auth.issueToken({ username, userpwd });
  reply.send(token);
};

exports.authenticate = async (req, reply) => {
  reply.send(await Auth.verifyToken(req));
};
