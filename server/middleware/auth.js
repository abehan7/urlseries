const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });
const secret = process.env.ACCESS_TOKEN_SECRET;
const auth = async (req, res, next) => {
  const rowToken = req.headers.authorization;
  // console.log(rowToken);
  // console.log(secret);
  try {
    const token = rowToken.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      // req.userId = decodedData?.id;
      req.decodedData = decodedData;
    } else {
      decodedData = jwt.decode(token);
      req.user_id = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
