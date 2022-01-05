const { Users } = require("../models/Users");

const LoginMiddleWare = (req, res, next) => {
  const { password, user_id } = req.body;
  const query = { user_id: user_id };
  Users.findOne(query, async (err, user) => {
    if (err) console(err);
    if (user) {
      const LoginAuth = await Users.comparePassword(password, user.password);
      if (LoginAuth) {
        return next();
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not register");
    }
  });
};

module.exports = { LoginMiddleWare };
