const bcrypt = require("bcrypt");

bcrypt.genSalt(10, function (err, salt) {
  if (err) return next(err);
  bcrypt.hash(1234, salt, function (err, hash) {
    if (err) return next(err);
    console.log(hash);
    next();
  });
});
