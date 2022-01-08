const db = require("../models");
const puppeteer = require("puppeteer");

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

const TotalAfter = async (req, res) => {
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
};

const TotalURL = async (req, res) => {
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
};

const FolderItems = async (req, res) => {
  await db.Folders.find()
    .sort({ _id: -1 })
    .then((response) => {
      console.log("folderItems found!");
      res.json(response);
    });
};

const Search = async (req, res) => {
  await db.Urls.find({
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
};

const Get21Urls = async (req, res) => {
  await db.Urls.find({
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
};

const AddFolder = async (req, res) => {
  const { folder } = req.body;
  console.log(folder);
  const newFolder = new db.Folders({
    ...folder,
  });
  // console.log(newFolder);
  await newFolder.save();
  res.json(newFolder);
};

const EditUrl = async (req, res) => {
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

const ChangedAssignedTag = async (req, res) => {
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

const FolderContentsChanged = (req, res) => {
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
};

const FolderLiked = (req, res) => {
  const { ModifiedList } = req.body;

  try {
    ModifiedList.forEach(async (val) => {
      const query = { _id: val._id };
      const option = {
        $set: {
          folder_liked: val.folder_liked,
        },
      };
      await db.Folders.updateOne(query, option).exec();
    });
    console.log("Like Modified!");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const DeleteUrl = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await db.Urls.findOneAndRemove({ _id: id });
  res.send("item deleted");
  console.log("item deleted");
};

const DeleteFolder = async (req, res) => {
  const { idList } = req.body;
  console.log(idList);
  const query = { _id: idList };
  try {
    await db.Folders.deleteMany(query).exec();
    console.log(`${idList} Folder Deleted!`);
    res.json(`${idList} Folder Deleted!`);
  } catch (err) {
    console.log(err);
    res.json(`${idList} Folder NOT Deleted`);
  }
};

const Crawling = (req, res) => {
  const { url } = req.body;
  // console.log(url);
  (async () => {
    const options = {
      headless: true,
      args: ["--fast-start", "--disable-extensions", "--no-sandbox"],
      ignoreHTTPSErrors: true,
    };
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
      await console.log(hashtags);
      await res.json({ title, hashtags });
    } catch (error) {
      console.log(error.name);
      await res.json({ title: "제목이 존재하지 않습니다.", hashtags: [""] });
    }
  })();
  // const options = {
  //   headless: true,
  //   args: ["--fast-start", "--disable-extensions", "--no-sandbox"],
  //   ignoreHTTPSErrors: true,
  // };
  // await puppeteer.launch(options);
};

module.exports = {
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
};
