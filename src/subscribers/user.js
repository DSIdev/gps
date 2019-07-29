const userService = require("../services/user");
exports.init = () => {
  userService.subscribe.on(userService.events.getAll, function(data) {
    // Make the listener execution async
    setImmediate(() => {
      console.log(data);
    });
  });
};
