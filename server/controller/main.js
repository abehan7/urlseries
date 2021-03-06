const db = require("../models");
const puppeteer = require("puppeteer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Users } = require("../models");

dotenv.config({ path: "../.env" });

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

const getGuestUrls = async (req, res) => {
  const user_id = "6221ae82657b4859df4b2db2";
  const query = { user_id };
  const guestUrls = await db.Urls.find(query).sort({ _id: -1 });

  const recentSearchedUrl = [];

  const totalUrl = await db.Urls.find(query).limit(40).sort({ _id: -1 });

  const leftUrl = await db.Urls.find({ url_likedUrl: 1, user_id }).sort({
    "url_search.url_searchedDate": -1,
  });

  const rightUrl = await db.Urls.find(query)
    .sort({ url_updatedDate: -1 })
    .limit(20);

  res.json({
    totalUrl,
    leftUrl,
    rightUrl,
    recentSearchedUrl,
  });
};

const TotalAfter = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  let totalAfter = [];
  const query = { user_id };
  totalAfter = await db.Urls.find(query).sort({ _id: -1 });
  const tags = await db.Hashtags.findOne(query, {
    hashtag_assigned: 1,
  });
  const hashtag_assigned = tags?.hashtag_assigned;
  res.json({
    totalAfter,
    hashtag_assigned,
  });
};

const TotalURL = async (req, res) => {
  console.log("total url");
  const { id } = req.user;
  const user_id = id;
  console.log(id);
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤
  var totalURL = [];
  var leftURL = [];
  var rightURL = [];
  var recentSearched = [];

  const query = { user_id };

  totalURL = await db.Urls.find(query).limit(40).sort({ _id: -1 });

  leftURL = await db.Urls.find({ url_likedUrl: 1, user_id }).sort({
    "url_search.url_searchedDate": -1,
  });

  rightURL = await db.Urls.find(query).sort({ url_updatedDate: -1 }).limit(20);

  recentSearched = await db.Urls.find({
    "url_search.url_searchClicked": 1,
    user_id,
  })
    .sort({ "url_search.url_searchedDate": -1 })
    .limit(20);

  await res.json({ totalURL, leftURL, rightURL, recentSearched });
};

const FolderItems = async (req, res) => {
  const user_id = req.user.id;
  await db.Folders.find({ user_id })
    .sort({ _id: -1 })
    .then((response) => {
      console.log("folderItems found!");
      res.json(response);
    });
};

const Search = async (req, res) => {
  // url_title: { $regex: new RegExp(req.body.typedKeyword), $options: "i" },

  await db.Urls.find(
    { user_id },
    {
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
    }
  ).then((response) => {
    res.json(response);
  });
};

const SearchDeleteAll = async (req, res) => {
  const query = {
    $set: {
      "url_search.url_searchClicked": 0,
      "url_search.url_searchedDate": Date.now(),
    },
  };
  try {
    await db.Urls.updateMany({}, query);
    console.log("deleted all search records");
  } catch (err) {}
};

const Get21Urls = async (req, res) => {
  const user_id = req.user.id;
  console.log(user_id);
  await db.Urls.find({
    user_id: user_id,
    $expr: { $lt: [{ $toDouble: "$url_id" }, Number(req.body.lastId)] },
  })
    .sort({ url_id: -1 })
    .collation({ locale: "en_US", numericOrdering: true })
    .limit(42)
    .then((response) => {
      res.json(response);
    });
};

const AddUrl = async (req, res) => {
  const { id } = req.user;
  const user_id = id;

  console.log("addURl user_id : ", user_id);
  const { url, title, hashTags, memo } = req.body;
  const NewUrl = new db.Urls({
    url,
    url_title: title,
    url_hashTags: hashTags,
    url_memo: memo,
    user_id,
  });

  try {
    await NewUrl.save();
    res.json(NewUrl);
    console.log("inserted data from addUrl");
  } catch (err) {
    console.log(err);
  }
};

const AddFolder = async (req, res) => {
  const user_id = req.user.id;
  console.log("user_id: ", user_id);

  const { folder_name } = req.body;
  console.log(folder_name);
  const newFolder = new db.Folders({
    folder_name,
    user_id,
  });

  await newFolder.save();
  res.json(newFolder);
};

const EditUrl = async (req, res) => {
  const user_id = req.user.id;
  console.log(user_id);
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
};

const SearchedUrlBYE = async (req, res) => {
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
};

const ClickedSeachedURL = async (req, res) => {
  const { _id } = req.params;
  const query = { _id };
  try {
    const clickedUrl = await db.Urls.findOne(query);
    clickedUrl.url_search.url_searchClicked = 1;
    clickedUrl.url_search.url_searchedDate = Date.now();
    await clickedUrl.save();
    console.log(clickedUrl);
    res.json(clickedUrl);

    // await db.Urls.updateOne(
    //   { _id: url._id },
    //   {
    //     $set: {
    //       url_clickedNumber: url.url_clickedNumber + 1,
    //       "url_search.url_searchClicked": 1,
    //       "url_search.url_searchedDate": getCurrentDate(),
    //     },
    //   }
    // );
  } catch (err) {
    console.log(err);
  }
};

const ClickedURLInBox = async (req, res) => {
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
};

const updateFolderContents = async (req, res) => {
  const { folder_contents } = req.body;
  const user_id = req.user.id;
  const { id } = req.params;

  const urlTitles = folder_contents.map((url) => url.url_title); // 그냥 확인용
  console.log(urlTitles);

  const query = { _id: id, user_id };

  const update = {
    $set: {
      folder_contents: folder_contents,
    },
  };
  // 이거 옵션 선택하면 수정된거 보내주는 기능
  const options = { returnOriginal: false };

  try {
    await db.Folders.findOneAndUpdate(query, update, options).exec();
    console.log("contents changed successfully!");
  } catch (err) {
    console.log("contents NOT changed");
    console.log(err);
    res.send(err);
  }
};

const FolderLiked = async (req, res) => {
  const user_id = req.user.id;
  const { folders } = req.body;
  // folders _id들만 배열로 받아옴
  const likeQuery = { user_id, _id: { $in: folders } };
  const dislikeQuery = { user_id, _id: { $nin: folders } };

  const likeOption = {
    $set: {
      like: true,
    },
  };

  const dislikeOption = {
    $set: {
      like: false,
    },
  };

  try {
    await db.Folders.updateMany(likeQuery, likeOption).exec();
    await db.Folders.updateMany(dislikeQuery, dislikeOption).exec();
    console.log("Like Modified!");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const updateFolderName = async (req, res) => {
  const { user_id } = req.decodedData;
  const { id } = req.params;
  const { folder_name } = req.body;

  const query = { _id: id, user_id };
  await db.Folders.findById(query, (error, doc) => {
    doc.folder_name = folder_name;
    doc.url_updatedDate = getCurrentDate();
    doc.save();
  }).clone();
};

// FIXME: delete

const DeleteUrl = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const url_id = req.params.id;
  const query = { _id: url_id, user_id };
  try {
    await db.Urls.findOneAndRemove(query).exec();
    res.send("item deleted");
    console.log("item deleted");
  } catch (err) {
    console.log(err);
    res.send("item NOT deleted");
  }
};

const deleteUrls = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { urls } = req.body;
  console.log("urls from deleteUrls: ", urls);
  const query = { _id: { $in: urls }, user_id };
  try {
    await db.Urls.deleteMany(query).exec();
    res.send("items deleted");
    console.log("items deleted");
  } catch (err) {
    console.log(err);
    res.send("items NOT deleted");
  }
};

const DeleteFolder = async (req, res) => {
  const user_id = req.user.id;
  const { idList } = req.body;

  const query = { _id: idList, user_id };

  try {
    await db.Folders.deleteMany(query).exec();
    console.log(`${idList} Folder Deleted!`);
    res.json(`${idList} Folder Deleted!`);
  } catch (err) {
    console.log(err);
    res.json(`${idList} Folder NOT Deleted`);
  }
};

// FIXME: 크롤링
const Crawling = (req, res) => {
  const { url } = req.body;
  // console.log(url);
  (async () => {
    const options = {
      headless: true,
      args: [
        "--fast-start",
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        "--disable-site-isolation-trials",
        "--disable-extensions",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ],
      ignoreHTTPSErrors: true,
    };
    console.log("hi there");
    const browser = await puppeteer.launch(options);
    try {
      const page = await browser.newPage();

      await page.goto(url);
      const title = await page.title();
      const siteNames = [
        { url: "youtube", ko_name: "유튜브" },
        { url: "youtu", ko_name: "유튜브" },
        { url: "tistory", ko_name: "티스토리" },
        { url: "velog", ko_name: "벨로그" },
        { url: "naver", ko_name: "네이버" },
        { url: "instagram", ko_name: "인스타그램" },
        { url: "evernote", ko_name: "에버노트" },
        { url: "stackoverflow", ko_name: "스택오버플로우" },
        { url: "mozilla", ko_name: "모질라" },
      ];

      const siteInfo = siteNames.find((site) =>
        url.toLowerCase().includes(site.url)
      ) || { ko_name: "notExist" };

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
          break;

        case "notExist":
          const testurl = url.split("//");
          testurl[1].includes("www")
            ? hashtags.push(`#${testurl[1].split("/")[0].split(".")[1]}`)
            : hashtags.push(`#${testurl[1].split("/")[0].split(".")[0]}`);
          break;

        default:
      }
      await browser.close();
      console.log(title, hashtags);

      res.json({ title, hashtags });
    } catch (error) {
      console.log(error.name);
      await res.json({ title: "제목이 존재하지 않습니다.", hashtags: [""] });
    }
  })();
};

const generateAccessToken1 = async (user) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const option = {
    expiresIn: "3d",
  };
  const token = await jwt.sign({ user_id: user._id }, secret, option);
  return token;
};

// FIXME: 로그인 회원가입

const SignUp = async (req, res) => {};

const Login = async (req, res) => {};

module.exports = {
  SignUp,
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
  Login,
  SearchDeleteAll,
  updateFolderName,
  deleteUrls,
  getGuestUrls,
};
