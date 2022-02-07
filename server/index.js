const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const {
  TotalAfter,
  TotalURL,
  FolderItems,
  Search,
  Get21Urls,
  AddUrl,
  AddFolder,
  EditUrl,
  ChangedAssignedTag,
  SearchedUrlBYE,
  ClickedSeachedURL,
  ClickedURLInBox,
  FolderContentsChanged,
  FolderLiked,
  DeleteUrl,
  DeleteFolder,
  Crawling,
  SignUp,
  Login,
  SearchDeleteAll,
} = require("./controller/main");

const authtest = require("./middleware/authtest");

dotenv.config({ path: "./.env" });
// const PORT = process.env.PORT || 3001;
const whitelist = [
  "http://localhost:3000",
  "https://61e609ea9d39fc0007234cee--inspiring-lewin-5ee272.netlify.app",
  "https://inspiring-lewin-5ee272.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();

app.use(cors());
// app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes

app.use("/user", require("./routes/userRouter"));
app.use("/apitest", require("./routes/upload"));

// const UrlModel = require("./models/Urls");
// const UsersModel = require("./models/users");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

// [1] ==================================== 테스트용도 get ====================================
app.get("/hithere", async (req, res) => {
  console.log("hi there");
  res.json("hi there");
});

// [2] ==================================== 해쉬태그에서 사용할 전체url get ====================================

app.get("/TotalAfter", authtest, TotalAfter);

// [3] ==================================== 맨 처음 접속하면 보여줄 부분들만 뽑은 get ====================================

app.get("/totalURL", authtest, TotalURL);
// [4] ==================================== 폴더 아이템들 가지고오기 ====================================
app.get("/folderItems", authtest, FolderItems);

// [5] ==================================== 폴더 아이템들 가지고오기 ====================================
app.get("/search/delete/all", authtest, SearchDeleteAll);

// [1] ==================================== 검색어 검색하는 post ====================================

app.post("/search", Search);

// [2] ==================================== 무한스크롤 post ====================================

app.post("/get21Urls", authtest, Get21Urls);

// [3] ==================================== url추가 용도 post ====================================

app.post("/addUrl", authtest, AddUrl);
// [4] ==================================== 폴더 추가 ====================================
app.post("/addFolder", authtest, AddFolder);

// [5]==================================== 로그인 post ====================================
// #FIXME: 회원가입

// app.post("/signUp", SignUp);

// app.post("/login", Login);

// [1] ==================================== url수정 용도 put ====================================

app.put("/editUrl", authtest, EditUrl);

// [2] ==================================== 태그 수정 put ====================================

app.put("/ChangedAssignedTag", authtest, ChangedAssignedTag);

// [3] ==================================== 검색어 클릭한거 삭제  (1에서 0으로 수정) put ====================================
app.put("/searchedUrlBYE", SearchedUrlBYE);
// [4] ==================================== 검색어 클릭한거 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put ====================================
app.put("/clickedSeachedURL/:_id", ClickedSeachedURL);

// [5] ==================================== 박스들에서 url클릭하면 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put ====================================
app.put("/clickedURLInBox", ClickedURLInBox);

// [6] ====================================   폴더 해쉬태그 contents 수정하는 put ====================================
app.put("/folderContentsChanged", authtest, FolderContentsChanged);

// [7] ==================================== 폴더 좋아요 된거 수정 ====================================
app.put("/FolderLiked", authtest, FolderLiked);

// [1] ==================================== url삭제 delete ====================================

app.delete("/deleteUrl/:id", authtest, DeleteUrl);

// [2] ==================================== 폴더삭제 ====================================
app.post("/deleteFolder", authtest, DeleteFolder);

// [1] ====================================== 퍼펫티어 ======================================

app.post("/crawling", Crawling);

app.listen(process.env.PORT || 3001, () => {
  console.log(`SERVER RUNNING`);
});

// TODO:
//  여기 있는것들을 조합해서 만들면 될듯
//  그리고 db에 RefreshToken USERS에 넣기

// const generateAccessToken = (user) => {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "1h" });
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign(user.process.env.REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
// };

// const authtestenicateToken = (req, res, next) => {
//   const authtestHeader = req.headers["authtestorization"];
//   const token = authtestHeader && authtestHeader.split(" ")[1];
//   if (token === null) return res.sendStatus(401);
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// app.post("/tokentest", (req, res) => {
//   const { BearerToken } = req.body;
//   const token = BearerToken.split(" ")[1];
//   const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   res.json(result);
// });

// app.post("/login2", (req, res) => {
//   const { user } = req.body;
//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);
//   // 여기 refrechToken은 db에 저장하기
//   res.json({ accessToken: accessToken, refreshToken: refreshToken });
// });

// let refreshTokens = [];
// // 이거는 db에 저장해야돼

// app.post("/token", (req, res) => {
//   const { refreshToken } = req.body;
//   if (refreshToken === null) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ name: user.name });
//     res.json({ accessToken: accessToken });
//   });
// });

// app.delete("/logout", (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   res.sendStatus(204);
// });

// app.get("/posts", authtestenicateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });
