const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);

const { CLIENT_URL } = process.env;

const cookieConfig = {
  domain: "http://localhost:3000",
  httpOnly: true,
  sameSite: "None",
  path: "/user/refresh_token",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const userCtrl = {
  //회원가입 기능로직
  register: async (req, res) => {
    try {
      const { user_id, email, password } = req.body;

      // 아이디, 이메일, 비밀번호 입력이 모두 안되어있을 경우

      if (!user_id || !email || !password) {
        return res.status(400).json({ msg: " 모두 입력해주세요" });
      }

      // email 양식 함수를 이용하여 형식을 맞춰야함
      if (!validateEmail(email)) {
        return res.status(400).json({ msg: "email 형식을 맞춰주세요" });
      }

      //아이디 중복 여부확인

      const user = await Users.findOne({ user_id });
      if (user) {
        return res.status(400).json({ msg: "이미존재하는 아이디입니다" });
      }

      //비밀번호 최소 자리수
      if (password.length < 6) {
        return res.status(400).json({ msg: "비밀번호 최소 6자리 입니다" });
      }

      //bcrypt 를 이용한 비밀번호 해쉬화

      const passwordHash = await bcrypt.hash(password, 12);
      console.log({ password, passwordHash });

      // newUser 에 해쉬처리된 비밀번호 추가
      const newUser = {
        user_id,
        email,
        password: passwordHash,
      };

      console.log("newUser", newUser);

      //토큰 생성

      const activation_token = createActivationToken(newUser);

      console.log(activation_token);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      console.log(url);

      //가입 이메일과 url을 받아 sendMail 실행

      sendMail(email, url, "이메일 인증하기 ");

      res.json({ msg: "가입성공, 이메일 인증을 진행해주세요" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Email 인증 로직
  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      const { user_id, email, password } = user;

      const check = await Users.findOne({ email });
      if (check) {
        return res.status(400).json({ msg: "이메일이 이미 존재합니다" });
      }

      const newUser = new Users({
        user_id,
        email,
        password,
      });

      await newUser.save();

      res.json({ msg: "계정이 생성되었습니다" });

      console.log(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //로그인 기능로직
  login: async (req, res) => {
    try {
      const { user_id, password } = req.body;
      console.log(user_id, password);
      const user = await Users.findOne({ user_id });
      if (!user) {
        return res.status(400).json({ msg: "아이디가 존재하지 않습니다" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);

      console.log(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다" });

      console.log(user);
      const refresh_token = createRefreshToken({ id: user._id });
      const cookieConfig = {
        httpOnly: true,
        sameSite: "None",
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      };
      console.log("로그인 성공");

      res.cookie("refreshtoken", refresh_token, cookieConfig);

      res.json({ msg: "로그인 성공" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //accesstoken 발급
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      // console.log("rf_token", rf_token);
      // console.log("✝✝✝✝✝✝✝");
      if (!rf_token) {
        return res.status(400).json({ msg: "지금로그인해주세요" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "지금로그인해주세요" });
        }
        const access_token = createAccessToken({ id: user.id });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //비밀번호 분실시 메일
  forgotPassword: async (req, res) => {
    try {
      const { user_id, email } = req.body;
      const user = await Users.findOne({ user_id, email });
      if (!user) {
        return res.status(400).json({ msg: "아이디와 이메일을 확인해주세요" });
      }

      const access_token = createAccessToken({ id: user.id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;

      sendMail(email, url, "비밀번호를 재설정 하기");
      res.json({ msg: "비밀번호 변경을 위해 메일을 확인해주세요 " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //비밀번호 리셋 코드
  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      console.log(password);
      const passwordHash = await bcrypt.hash(password, 12);

      console.log(req.user);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );

      res.json({ msg: "비밀번호가 성공적으로 변경되었습니다" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //유저정보 불러오기
  getUserInfor: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsersAllInfor: async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //유저정보업데이트 입맛대로 넣을 수 있다
  updateUser: async (req, res) => {
    try {
      const { avatar } = req.body;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          avatar,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Admin 계정일 때 role = 1 인 상태에서 유저들의 role을 변경할 수 있다
  updateUsersRole: async (req, res) => {
    try {
      const { role } = req.body;

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );

      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Admin 계정일 때 role=1 인 상태에서 유저들을 삭제할 수 있다
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);

      res.json({ msg: "Deleted Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Google 로그인
  googleLogin: async (req, res) => {
    try {
      const { tokenId } = req.body;
      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });

      console.log(verify);

      const { email_verified, email, name, picture } = verify.payload;

      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      if (!email_verified)
        return res.status(400).json({ msg: "이메일 확인에 실패하였습니다" });

      const user = await Users.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "비밀번호가 올바르지 않습니다" });
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, cookieConfig);

        res.json({ msg: "로그인 성공" });
      } else {
        const newUser = new Users({
          user_id: name,
          email,
          password: passwordHash,
          avatar: picture,
        });

        await newUser.save();
        const refresh_token = createRefreshToken({ id: newUser._id });

        res.cookie("refreshtoken", refresh_token, cookieConfig);
        console.log("로그인 성공 구글로그인 else");

        res.json({ msg: "로그인 성공" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

//Ctrl에 필요한 함수들

//email 형식 정의 함수
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

//token 생성 함수
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
