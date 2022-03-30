const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { FolderItems } = require("./controller/main");

const http = require("http");
const cron = require("node-cron");
// second minute hour day-of-month month day-of-week
cron.schedule("*/20 23,0-14 * * *", function () {
  console.log("node-cron");
  http.get("http://cors-nhj12311.herokuapp.com");
});

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

//Routes
app.use("/user", require("./routes/userRouter"));
app.use("/apitest", require("./routes/upload"));
app.use("/hashtag", hashtagRouter);
app.use("/crawler", require("./routes/crawler"));
app.use("/url", require("./routes/urls"));
app.use("/folder", require("./routes/folders"));

// [4]  폴더 아이템들 가지고오기
app.get("/folderItems", authtest, FolderItems);

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
