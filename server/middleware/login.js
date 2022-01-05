const { Users } = require("../models/Users");

const LoginMiddleWare = (req, res, next) => {
  const { password, user_id } = req.body;
  const query = { user_id: user_id };
  Users.findOne(query, async (err, user) => {
    if (err) console(err);
    if (user) {
      // #FIXME: 비밀번호 확인
      await user.comparePassword(password).then((isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 일치하지 않습니다",
          });
        }
      });
      // FIXME: 확인 후 토큰화
      console.log("👏👏👏👏👏👏");

      await user
        .generateToken()
        .then((user) => {
          return res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ message: "로그인 성공🎉🎉🎉🎉", user: user._id });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
      // 토큰화 완료
    }
  });
};

module.exports = { LoginMiddleWare };
