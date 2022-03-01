const mongoose = require("mongoose");
const TokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const Tokens = mongoose.model("tokens", TokenSchema);
module.exports = Tokens;
