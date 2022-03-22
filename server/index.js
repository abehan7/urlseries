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
app.use("/url", require("./routes/urls"));
app.use("/folder", require("./routes/folders"));

// [4]  폴더 아이템들 가지고오기
app.get("/folderItems", authtest, FolderItems);

// app.get("/url/guest", getGuestUrls);

// [3]  url추가 용도 post

app.put("/editUrl", authtest, EditUrl);

// FIXME: 폴더이름 수정
app.patch("/updateFolderName/:id", authtest, updateFolderName);

// FIXME: 태그수정
// app.patch("/hashtags", auth, updateLikeTags);

// [6]    폴더 해쉬태그 contents 수정하는 put
app.patch("/folder/contents/:id", authtest, updateFolderContents);

// [7]  폴더 좋아요 된거 수정
app.put("/FolderLiked", authtest, FolderLiked);

// [2]  폴더삭제
app.post("/deleteFolder", authtest, DeleteFolder);

// [1] 퍼펫티어

app.post("/crawling", Crawling);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
