const bcrypt = require("bcryptjs");
const pwd = "12345678";
const time = Date.now();
// const salt =
bcrypt
  .genSalt(10)
  .then(salt => {
    console.log(salt);
    return bcrypt.hash(pwd, salt);
  })
  .then(function(hash) {
    console.log(hash);
    console.log(Date.now() - time);
  })
  .catch(err => console.log(err));
