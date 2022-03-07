const jwt = require("jsonwebtoken");

const authtest = (req, res, next) => {
  console.log("from authtest");
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ msg: "Invalid Authentication.111" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(400).json({ msg: "Invalid Authentication.222" });
      // console.log(user);
      // console.log("authtest");
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authtest;
