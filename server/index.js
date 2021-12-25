const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");
const { somethingIsNotMaching, difference } = require("./Funcs");

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

// const UrlModel = require("./models/Urls");
// const UsersModel = require("./models/users");

// TODO: #1 해쉬태그는 잘 들어가는데 대소문자 구분을 안하고 들어가서 이거 버그생길듯
// TODO: #2 그리고 글 등록하기 하는데 FOR때문인지 약간 느리게 느껴졌음 아싸리 그냥 async없이 그냥 일단 useState로 현재 있는 곳에 넣은 다음에
//          사후적으로 db에 들어가게 하는 방향이 좀 더 옳은 방향일 수도 있는거같다
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
  await db.Urls.find({ url_id: 5 })
    .populate({ path: "hashtags_id" })
    .exec((err, data) => {
      if (err) console.log(err);
      console.log(data[0].hashtags_id);
      res.json(data);
    });
});

// [2] ==================================== 해쉬태그에서 사용할 전체url get ====================================

app.get("/TotalAfter", async (req, res) => {
  let totalAfter = [];
  let assignedTags = [];
  await db.Urls.find({})
    .sort({ _id: -1 })
    .then((response) => {
      totalAfter = response;
    });

  await db.Hashtags2.findOne(
    { user_id: "hanjk123@gmail.com" },
    { hashtag_assigned: 1 }
  ).then((response) => {
    assignedTags = response.hashtag_assigned;
  });

  res.json({
    totalAfter: totalAfter,
    initAssigned: assignedTags,
  });
});

// [3] ==================================== 맨 처음 접속하면 보여줄 부분들만 뽑은 get ====================================

app.get("/totalURL", async (req, res) => {
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤
  var totalURL = [];
  var leftURL = [];
  var rightURL = [];
  var recentSearched = [];

  await db.Urls.find({})
    .limit(42)
    .sort({ _id: -1 })
    .then((response) => {
      totalURL = response;
    });

  await db.Urls.find({ url_likedUrl: 1 })
    .sort({
      "url_search.url_searchedDate": -1,
    })
    .then((response) => {
      leftURL = response;
    });

  await db.Urls.find({})
    .sort({ url_updatedDate: -1 })
    .limit(20)
    .then((response) => {
      rightURL = response;
      // console.log(rightURL);
    });

  await db.Urls.find({ "url_search.url_searchClicked": 1 })
    .sort({
      "url_search.url_searchedDate": -1,
    })
    .limit(20)
    .then((response) => {
      recentSearched = response;
    });

  // await db.Hashtags2.findOne(
  //   { user_id: "hanjk123@gmail.com" },
  //   { hashtag_assigned: 1 }
  // ).then((response) => {
  //   assignedTags = response.hashtag_assigned;
  // });
  await res.json({
    totalURL: totalURL,
    leftURL: leftURL,
    rightURL: rightURL,
    recentSearched: recentSearched,
    // assignedTags: assignedTags,
  });
});

// [1] ==================================== 검색어 검색하는 post ====================================

app.post("/search", async (req, res) => {
  db.Urls.find({
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
  await db.Urls.find({
    $expr: { $lt: [{ $toDouble: "$url_id" }, Number(req.body.lastId)] },
  })
    .sort({ url_id: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(42)
    .then((response) => {
      res.json(response);
    });
});

// [3] ==================================== url추가 용도 post ====================================

app.post("/addUrl", async (req, res) => {
  const { url, title, hashTags, memo } = req.body;
  const NewUrl = new db.Urls({
    url: url,
    url_title: title,
    url_hashTags: hashTags,
    url_memo: memo,
  });

  try {
    await NewUrl.save();
    res.json(NewUrl);
    console.log("inserted data from addUrl");
  } catch (err) {
    console.log(err);
  }
});

// [1] ==================================== url수정 용도 put ====================================
// FIXME: 오늘은 여기한다
// TODO: 차라리 해쉬태그 컬렉션 없애버리는게 좀 더 효율적일 수도 있어
//       이거 너무 복잡하고 전체적으로 느려지니까 그냥 한번 업데이트 할 때 마다 쿼리하는게 편할꺼같아
//       한번 속도 측정을 해보고 결정하자
//       지금처럼 하는거는 너무 복잡해서 두아파
//       내꺼 싸이즈로 봐서는 아직 해쉬태그 그렇게 컬렉션 하나 파서 하는건 아닌거 같아
//       애초에 many2many는 여기 웹에서 의미가 없는거같아
//       왜냐면 mant2many중 하나가 고정되어있어야 하는데 해쉬태그는 계속 변동되니까
//       좀 카테고리가 정해져 있고 한사람만 업로드?하는 그런 곳에서만 의미있는 거같아 여기는 아닌거같고
// TODO: 그러면 오늘 할 일 !
// #1 hashtag컬렉션 다시 만든다
// #2 add에서 다시 수정한다
// add할때마다 indexOf하거나 includes해서 존재 여부 물어본 다음에 넣으면 될듯하다
// 그리고 오른쪽에 배정된것도 그냥 hashtag컬렉션에 넣자 이름으로 넣는게 맞는듯하다
// 삭제하면 딱 그 태그들 있는지 find한 다음에 없으면 지우기
// 딱 해쉬태그 들어갈 때에만 loading 돌아가면서 그때 axios하기
// 그러면 언제 전체 태그 unique하게 만들지?
//  편집모드 누를때마다 한번씩 하기? 그게 나을까? 그게 맞는듯하네
//  그래서 데이터 갱신하는게 딱 거기에만 한정짓는게 맞다
// 아니 그냥 처음 유저가 한번만 누르면 cashe로 남게하는게 맞는듯하다
// 애초에 필드로 만들어서 할 필요는 없을꺼같아
// assigned만 필요하고
// 그래서 assigned에 push pull만 해주면 될꺼같아

app.put("/editUrl", async (req, res) => {
  console.log(req.body);

  const { _id, newUrl, newTitle, newHashTags, newMemo, newLikedUrl } = req.body;
  try {
    await db.Urls.findById(_id, (error, urlToUpdate) => {
      urlToUpdate.url = newUrl;
      urlToUpdate.url_title = newTitle;
      urlToUpdate.url_hashTags = newHashTags;
      urlToUpdate.url_memo = newMemo;
      urlToUpdate.url_likedUrl = Number(newLikedUrl);
      urlToUpdate.url_updatedDate = getCurrentDate();

      urlToUpdate.save();
      res.json(urlToUpdate);
    }).clone();
  } catch (err) {
    console.log(err);
  }
});

// [2] ==================================== 태그 수정 put ====================================

app.put("/ChangedAssignedTag", async (req, res) => {
  const { oneLineTags } = req.body;
  console.log(oneLineTags);
  try {
    await db.Hashtags2.updateOne(
      { user_id: "hanjk123@gmail.com" },
      {
        $set: {
          hashtag_assigned: oneLineTags,
        },
      }
    ).then((response) => {
      console.log(response);
      console.log("data changed seccessfully!");
    });
  } catch (err) {
    console.log(err);
  }
});

// [3] ==================================== 검색어 클릭한거 삭제  (1에서 0으로 수정) put ====================================
app.put("/searchedUrlBYE", async (req, res) => {
  const { url } = req.body;
  try {
    await db.Urls.updateOne(
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
  const { url } = req.body;
  try {
    await db.Urls.updateOne(
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
  const { url } = req.body;
  try {
    await db.Urls.updateOne(
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
  await db.Urls.findOneAndRemove({ _id: id });
  res.send("item deleted");
  console.log("item deleted");
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
