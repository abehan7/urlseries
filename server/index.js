const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

const UrlModel = require("./models/Urls");
const UsersModel = require("./models/users");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
  );
};

// [1] ==================================== 테스트용도 get ====================================
app.get("/hithere", async (req, res) => {
  await UsersModel.find(
    { user_id: "hanjk123@gmail.com" },
    { user_asignedTags: 1 }
  ).then((response) => {
    console.log(response);
    res.json(response);
  });
});

// [2] ==================================== 해쉬태그에서 사용할 전체url get ====================================

app.get("/TotalAfter", async (req, res) => {
  await UrlModel.find({})
    .sort({ _id: -1 })
    .then((response) => {
      res.json(response);
    });
});

// [3] ==================================== 맨 처음 접속하면 보여줄 부분들만 뽑은 get ====================================

app.get("/totalURL", async (req, res) => {
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤
  var realTotalURLS = [];
  var totalURL = [];
  var leftURL = [];
  var rightURL = [];
  var asignedTags = [];
  var recentSearched = [];
  var totalTags = [];

  await UrlModel.find({})
    .limit(42)
    .sort({ _id: -1 })
    .then((response) => {
      totalURL = response;
    });

  // await UrlModel.find({}).then((response) => {
  //   realTotalURLS = response;
  // });

  await UrlModel.find({ url_likedUrl: 1 })
    .sort({
      "url_search.url_searchedDate": -1,
    })
    .then((response) => {
      leftURL = response;
    });

  await UrlModel.find({
    $expr: { $gte: [{ $toDouble: "$url_clickedNumber" }, 1] },
  })
    .sort({ url_clickedNumber: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(6)
    .then((response) => {
      rightURL = response;
    });

  await UrlModel.find({ "url_search.url_searchClicked": 1 })
    .sort({
      "url_search.url_searchedDate": -1,
    })
    .then((response) => {
      recentSearched = response;
    });

  await UsersModel.find(
    { user_id: "hanjk123@gmail.com" },
    { user_asignedTags: 1, user_totalTags: 1 }
  ).then((response) => {
    asignedTags = response[0].user_asignedTags;
    totalTags = response[0].user_totalTags;
  });

  await res.json({
    totalURL: totalURL,
    leftURL: leftURL,
    rightURL: rightURL,
    asignedTags: asignedTags,
    recentSearched: recentSearched,
    totalTags: totalTags,
  });
});

// [1] ==================================== 검색어 검색하는 post ====================================

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

// [2] ==================================== 무한스크롤 post ====================================

app.post("/get21Urls", async (req, res) => {
  await UrlModel.find({
    $expr: { $lt: [{ $toDouble: "$url_id" }, Number(req.body.lastId)] },
  })
    .sort({ url_id: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(21)
    .then((response) => {
      res.json(response);
    });
});

// [3] ==================================== url추가 용도 post ====================================

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
    res.json(url);
    console.log("inserted data from addUrl");
  } catch (err) {
    console.log(err);
  }
});

// [1] ==================================== url수정 용도 put ====================================

app.put("/editUrl", async (req, res) => {
  console.log(req.body);
  const _id = req.body._id;
  const newUrl = req.body.newUrl;
  const newTitle = req.body.newTitle;
  const newHashTags = req.body.newHashTags;
  const newMemo = req.body.newMemo;
  const newLikedUrl = req.body.newLikedUrl;
  try {
    await UrlModel.findById(_id, (error, urlToUpdate) => {
      urlToUpdate.url = newUrl;
      urlToUpdate.url_title = newTitle;
      urlToUpdate.url_hashTags = newHashTags;
      urlToUpdate.url_memo = newMemo;
      urlToUpdate.url_likedUrl = Number(newLikedUrl);
      urlToUpdate.url_updatedDate = getCurrentDate();

      urlToUpdate.save();
      res.json(urlToUpdate);
    });
  } catch (err) {
    console.log(err);
  }
});

// [2] ==================================== 태그 수정 put ====================================

app.put("/ChangedAssignedTag", async (req, res) => {
  console.log(req.body.totalTags);
  try {
    await UsersModel.updateOne(
      { user_id: "hanjk123@gmail.com" },
      {
        $set: {
          user_totalTags: req.body.totalTags,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// [3] ==================================== 검색어 클릭한거 삭제  (1에서 0으로 수정) put ====================================
app.put("/searchedUrlBYE", async (req, res) => {
  const url = req.body.url;
  try {
    await UrlModel.updateOne(
      { _id: url._id },
      {
        $set: {
          "url_search.url_searchClicked": url.url_search.url_searchClicked,
        },
      }
    ).then(() => {
      console.log("DATA changed");
    });
  } catch (err) {
    console.log(err);
  }
});
// [4] ==================================== 검색어 클릭한거 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put ====================================
app.put("/clickedSeachedURL", async (req, res) => {
  const url = req.body.url;
  try {
    await UrlModel.updateOne(
      { _id: url._id },
      {
        $set: {
          url_clickedNumber: url.url_clickedNumber + 1,
          "url_search.url_searchClicked": 1,
          "url_search.url_searchedDate": getCurrentDate(),
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// [5] ==================================== 박스들에서 url클릭하면 +1 AND 클릭한 시간 갱신  (1에서 0으로 수정) put ====================================
app.put("/clickedURLInBox", async (req, res) => {
  const url = req.body.url;
  try {
    await UrlModel.updateOne(
      { _id: url._id },
      {
        $set: {
          url_updatedDate: getCurrentDate(),
        },
        $inc: { url_clickedNumber: 1 },
      }
    ).then((response) => {
      console.log(response);
    });
  } catch (err) {
    console.log(err);
  }
});
// [1] ==================================== url삭제 delete ====================================

app.delete("/deleteUrl/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await UrlModel.findOneAndRemove({ _id: id });
  res.send("item deleted");
  console.log("item deleted");
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
