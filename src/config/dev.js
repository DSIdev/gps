module.exports = {
  ENV: "DEV",
  PORT: 3000,
  MONGO_URI: "mongodb://localhost/trans",
  getEnv: function() {
    return this.ENV;
  }
};
