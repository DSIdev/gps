console.log("Setup subscribers");

const subscriberModuleArray = ["user"];

exports.init = () => {
  subscriberModuleArray.forEach(subscriberModule => {
    let listeners = require(`./${subscriberModule}`);
    if (listeners.init && typeof listeners.init === "function")
      listeners.init();
    else console.error(`Missing init() in subscribers/${subscriberModule}`);
  });
};
