const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./models");
// const { somethingIsNotMaching, difference } = require("./Funcs");
const puppeteer = require("puppeteer");

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
  });
});
// [4] ==================================== 폴더 아이템들 가지고오기 ====================================
app.get("/folderItems", (req, res) => {
  db.Folders.find().then((response) => {
    console.log("folderItems found!");
    res.json(response);
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

// [6] ====================================  폴더 해쉬태그 contents 수정하는 put ====================================
app.put("/folderContentsChanged", (req, res) => {
  const {
    nowFolder2: { _id, folder_contents },
  } = req.body;
  console.log(_id, folder_contents);

  const query = { _id: _id };

  const update = {
    $set: {
      folder_contents: folder_contents,
    },
  };
  // 이거 옵션 선택하면 수정된거 보내주는 기능
  const options = { returnOriginal: false };

  db.Folders.findOneAndUpdate(query, update, options).then((response) => {
    console.log(response);
    //   res.json();
  });
});

// [1] ==================================== url삭제 delete ====================================

app.delete("/deleteUrl/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await db.Urls.findOneAndRemove({ _id: id });
  res.send("item deleted");
  console.log("item deleted");
});

// [1] ====================================== 퍼펫티어 ======================================

app.post("/crawling", (req, res) => {
  const { url } = req.body;
  // console.log(url);
  (async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    const title = await page.title();
    const siteNames = [
      { url: "youtube", ko_name: "유튜브" },
      { url: "tistory", ko_name: "티스토리" },
      { url: "velog", ko_name: "벨로그" },
      { url: "naver", ko_name: "네이버" },
      { url: "instagram", ko_name: "인스타그램" },
      { url: "evernote", ko_name: "에버노트" },
      { url: "stackoverflow", ko_name: "스택오버플로우" },
    ];

    // const testurl = url.split("//");
    // testurl[1].includes("www")
    //   ? console.log(testurl[1].split("/")[0].split(".")[1])
    //   : console.log(testurl[1].split("/")[0].split(".")[0]);

    const siteInfo = siteNames.find((site) =>
      url.toLowerCase().includes(site.url)
    ) || { ko_name: "notExist" };
    // console.log(siteInfo);

    let hashtags = [];
    siteInfo.ko_name !== "notExist" && (hashtags = [`#${siteInfo.ko_name}`]);

    switch (siteInfo.ko_name) {
      case "유튜브":
        await page.waitForSelector("#text-container");
        try {
          const grabAuthor = await page.evaluate(() => {
            const author = document.querySelector("#text-container");
            return `#${author.innerText}`;
          });
          hashtags.push(grabAuthor);
        } catch (error) {
          console.log(error);
        }
      case "notExist":
        const testurl = url.split("//");
        testurl[1].includes("www")
          ? hashtags.push(`#${testurl[1].split("/")[0].split(".")[1]}`)
          : hashtags.push(`#${testurl[1].split("/")[0].split(".")[0]}`);

      default:
    }
    console.log(hashtags);

    // const grabData = await page.evaluate(() => {
    //   const data = document.querySelector("#info h1");
    //   return data.textContent;
    // });
    // await page.waitForSelector("#text-container");

    // const grabData = await page.evaluate(() => {
    //   const author = document.querySelector("#text-container");
    //   return author.innerText;
    // });

    // console.log(grabData);

    res.json(title);

    // await browser.close();
  })();
  // const options = {
  //   headless: true,
  //   args: ["--fast-start", "--disable-extensions", "--no-sandbox"],
  //   ignoreHTTPSErrors: true,
  // };
  // await puppeteer.launch(options);

  // switch (siteName) {
  //   case "YOUTUBE":
  //     return 1;
  //   case "NEVER":
  //     return 1;
  //   case "INSTAGRAM":
  //     return 1;
  //   case "FACEBOOK":
  //     return 1;
  //   case "TWITTER":
  //     return 1;
  //   case "GOOGLE":
  //     return 1;
  //   case "GOOGLE":
  //     return 1;
  //   default:
  //     return 1;
  // }
});

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
