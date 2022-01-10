const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");

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
const auth = require("./middleware/auth");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

// const UrlModel = require("./models/Urls");
// const UsersModel = require("./models/users");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// [1] ==================================== 테스트용도 get ====================================
app.get("/hithere", async (req, res) => {
  // 맨 처음에 회원가입 할 때 이걸로 유저들꺼 만든 다음에 hi2에 있는 걸로 insert하는 형식으로 하면 될 듯
  const Folder = new db.Folders({
    user_id: "hanjk123@gmail.com",
    folder_name: "페드로테크",
    folder_contents: ["#페드로", "#페드로테크", "#pedro", "#pedrotech"],
  });
  // console.log(Folder);

  Folder.save();
  console.log("folder inserted!");
  res.json(Folder);
});

// [2] ==================================== 해쉬태그에서 사용할 전체url get ====================================

app.get("/TotalAfter", auth, TotalAfter);

// [3] ==================================== 맨 처음 접속하면 보여줄 부분들만 뽑은 get ====================================

app.get("/totalURL", auth, TotalURL);
// [4] ==================================== 폴더 아이템들 가지고오기 ====================================
app.get("/folderItems", auth, FolderItems);

// [5] ==================================== 폴더 아이템들 가지고오기 ====================================
app.get("/search/delete/all", auth, SearchDeleteAll);

// [1] ==================================== 검색어 검색하는 post ====================================

app.post("/search", Search);

// [2] ==================================== 무한스크롤 post ====================================

app.post("/get21Urls", auth, Get21Urls);

// [3] ==================================== url추가 용도 post ====================================

app.post("/addUrl", auth, AddUrl);
// [4] ==================================== 폴더 추가 ====================================
app.post("/addFolder", auth, AddFolder);

// [5]==================================== 로그인 post ====================================
// #FIXME: 회원가입

app.post("/signUp", SignUp);

app.post("/login", Login);

// [1] ==================================== url수정 용도 put ====================================

app.put("/editUrl", auth, EditUrl);

// [2] ==================================== 태그 수정 put ====================================

app.put("/ChangedAssignedTag", auth, ChangedAssignedTag);

// [3] ==================================== 검색어 클릭한거 삭제  (1에서 0으로 수정) put ====================================
app.put("/searchedUrlBYE", SearchedUrlBYE);
// [4] ==================================== 검색어 클릭한거 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put ====================================
app.put("/clickedSeachedURL/:_id", ClickedSeachedURL);

// [5] ==================================== 박스들에서 url클릭하면 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put ====================================
app.put("/clickedURLInBox", ClickedURLInBox);

// [6] ====================================   폴더 해쉬태그 contents 수정하는 put ====================================
app.put("/folderContentsChanged", auth, FolderContentsChanged);

// [7] ==================================== 폴더 좋아요 된거 수정 ====================================
app.put("/FolderLiked", auth, FolderLiked);

// [1] ==================================== url삭제 delete ====================================

app.delete("/deleteUrl/:id", auth, DeleteUrl);

// [2] ==================================== 폴더삭제 ====================================
app.post("/deleteFolder", auth, DeleteFolder);

// [1] ====================================== 퍼펫티어 ======================================

app.post("/crawling", Crawling);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
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

// const authenicateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
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

// app.get("/posts", authenicateToken, (req, res) => {
//   res.json(posts.filter((post) => post.username === req.user.name));
// });
