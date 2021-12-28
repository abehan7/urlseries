// const express = require("express");
// const router = express.Router();
// const UsersCopy = require("../models/Users");

// router.post("/signup", (request, response) => {
//   const signedUpUser = new UsersCopy({
//     User_id: request.body.User_id,
//     password: request.body.password,
//     email: request.body.email,
//   });

//   signedUpUser
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.json(error);
//     });
// });

// module.exports = router;
