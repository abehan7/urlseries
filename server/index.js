const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();
app.use(cors());
app.use(express.json());

const UrlModel = require("./models/Urls");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

app.get("/hi", async (req, res) => {
  const url = new UrlModel({
    url: "https://iancoding.tistory.com/164",
    url_title: "CRUD Tutorial Using MERN Stack",
    hashTags: ["#mern", "#몽고", "페드로테크", "페드로"],
    url_memo: "",
  });

  try {
    await url.save();
    res.send("inserted data");
    console.log("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.post("/addUrl", async (req, res) => {
  console.log(req.body);
  const url = new UrlModel({
    url: req.body.url,
    url_title: req.body.title,
    url_hashTags: req.body.hashTags,
    url_memo: req.body.memo,
  });

  try {
    await url.save();
    res.send("inserted data from addUrl");
    console.log("inserted data from addUrl");
  } catch (err) {
    console.log(err);
  }
});

app.get("/totalURL", async (req, res) => {
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤
  var totalURL = [];
  var leftURL = [];
  var rightURL = [];

  await UrlModel.find({})
    .limit(42)
    .sort({ _id: -1 })
    .then((response) => {
      totalURL = response;
    });

  await UrlModel.find({ url_likedUrl: 1 }).then((response) => {
    leftURL = response;
  });

  await UrlModel.find({
    $expr: { $gte: [{ $toDouble: "$url_clickedNumber" }, 1] },
  })
    .sort({ url_clickedNumber: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(5)
    .then((response) => {
      rightURL = response;
    });

  res.json({
    totalURL: totalURL,
    leftURL: leftURL,
    rightURL: rightURL,
  });
});

app.get("/leftFive", (req, res) => {
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤

  UrlModel.find({ url_likedUrl: 1 }).then((response) => {
    console.log(response);
    res.json(response);
  });
});

app.post("/likedURL", (req, res) => {
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤

  UrlModel.updateOne({})
    .limit(42)
    .sort({ _id: -1 })
    .then((response) => {
      console.log(response);
      res.json(response);
    });
});

app.post("/search", async (req, res) => {
  UrlModel.find({
    // url_title: { $regex: new RegExp(req.body.typedKeyword), $options: "i" },
    $or: [
      {
        url_title: {
          $regex: new RegExp(req.body.typedKeyword),
          $options: "i",
        },
      },
      {
        url_hashTags: {
          $regex: new RegExp(req.body.typedKeyword),
          $options: "i",
        },
      },
    ],
  }).then((response) => {
    res.json(response);
  });
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
