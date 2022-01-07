const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user_asignedTags: {
    type: Array,
    required: false,
  },
  user_totalTags: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
//save메소드가 실행되기 전에 비밀번호를 암호화하는 로직
UserSchema.pre("save", function (next) {
  let user = this;

  //model 안의 paswsword가 변환될때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
//유저가 입력한 패스워드와 데이터베이스의 패스워드를 비교한 후 true/false 를 콜백함수로 넘겨줌
UserSchema.methods.comparePassword = function (plainPassword) {
  //plainPassword를 암호화해서 현재 비밀번호화 비교
  return bcrypt
    .compare(plainPassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};

//jwt를 통해 유저의 아이디로 토큰을 만든 후 저장
UserSchema.methods.generateToken = function () {
  // let user = this;
  const token = jwt.sign(this._id.toHexString(), "secretToken");
  this.token = token;
  return this.save()
    .then((user) => user)
    .catch((err) => err);
};

UserSchema.statics.findByToken = function (token) {
  let user = this;
  //secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
  //Db에 접근해서 유저의 정보를 가져온다

  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user
      .findOne({ _id: decoded, token: token })
      .then((user) => user)
      .catch((err) => err);
  });
};
const Users = mongoose.model("users", UserSchema);
module.exports = Users;
