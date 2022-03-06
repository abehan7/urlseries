const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const {
  TotalAfter,
  TotalURL,
  FolderItems,
  Search,
  Get21Urls,
  AddUrl,
  AddFolder,
  EditUrl,
  SearchedUrlBYE,
  ClickedSeachedURL,
  ClickedURLInBox,
  updateFolderContents,
  FolderLiked,
  DeleteUrl,
  DeleteFolder,
  Crawling,
  SignUp,
  Login,
  SearchDeleteAll,
  updateFolderName,
  deleteUrls,
  getGuestUrls,
} = require("./controller/main");

const authtest = require("./middleware/authtest");

const hashtagRouter = require("./routes/hashtags");

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 3001;
const whitelist = [
  "http://localhost:3001/",
  "https://urlseries.com",
  "http://localhost:3000",
  "https://urlstory.herokuapp.com/",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cookieParser());

app.use(fileUpload({ useTempFiles: true }));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

// const Port = process.env.PORT || 3001

//Routes

app.use("/user", require("./routes/userRouter"));
app.use("/apitest", require("./routes/upload"));
app.use("/hashtag", hashtagRouter);
app.use("/crawler", require("./routes/crawler"));
// app.use("/folder",);
// app.use("/url");
// app.use("/user");
// [1]  테스트용도 get
app.get("/hithere", async (req, res) => {
  req.session.user = "this is user";
  console.log("hi there");
  res.json("hi there");
});

app.get("/hello", async (req, res) => {
  console.log(req.session.user);
  res.json(req.session.user);
});

// [2]  해쉬태그에서 사용할 전체url get

app.get("/TotalAfter", authtest, TotalAfter);

// [3]  맨 처음 접속하면 보여줄 부분들만 뽑은 get

app.get("/totalURL", authtest, TotalURL);
// [4]  폴더 아이템들 가지고오기
app.get("/folderItems", authtest, FolderItems);

// [5]  폴더 아이템들 가지고오기
app.get("/search/delete/all", authtest, SearchDeleteAll);

app.get("/url/guest", getGuestUrls);

// [1]  검색어 검색하는 post

app.post("/search", Search);

// [2]  무한스크롤 post

app.post("/get21Urls", authtest, Get21Urls);

// [3]  url추가 용도 post

app.post("/addUrl", authtest, AddUrl);
// [4]  폴더 추가
app.post("/addFolder", authtest, AddFolder);

// [5] 로그인 post
// #FIXME: 회원가입

app.post("/signUp", SignUp);

app.post("/login", Login);

// [1]  url수정 용도 put

app.put("/editUrl", authtest, EditUrl);

// FIXME: 폴더이름 수정
app.patch("/updateFolderName/:id", authtest, updateFolderName);

// FIXME: 태그수정
// app.patch("/hashtags", auth, updateLikeTags);

// [3]  검색어 클릭한거 삭제  (1에서 0으로 수정) put
app.put("/searchedUrlBYE", SearchedUrlBYE);
// [4]  검색어 클릭한거 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put
app.put("/clickedSeachedURL/:_id", ClickedSeachedURL);

// [5]  박스들에서 url클릭하면 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put 123
app.put("/clickedURLInBox", ClickedURLInBox);

// [6]    폴더 해쉬태그 contents 수정하는 put
app.patch("/folder/contents/:id", authtest, updateFolderContents);

// [7]  폴더 좋아요 된거 수정
app.put("/FolderLiked", authtest, FolderLiked);

// [1]  url삭제 delete

app.delete("/deleteUrl/:id", authtest, DeleteUrl);

app.patch("/deleteUrls", authtest, deleteUrls);

// [2]  폴더삭제
app.post("/deleteFolder", authtest, DeleteFolder);

// [1] 퍼펫티어

app.post("/crawling", Crawling);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
