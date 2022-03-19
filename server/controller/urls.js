const getCurrentDate = require("../hooks/getCurrentDate");
const db = require("../models");

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

const updateUrl = async (req, res) => {
  const { id } = req.params;

  const {
    url: { url, url_title, url_hashTags, url_memo },
  } = req.body;

  const update = (error, doc) => {
    doc.url = url;
    doc.url_title = url_title;
    doc.url_hashTags = url_hashTags;
    doc.url_memo = url_memo;
    doc.url_updatedDate = getCurrentDate();
    doc.save();
    res.json(doc);
  };

  await db.Urls.findById(id, update).clone();
};

const addUrl = async (req, res) => {
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

const addUrls = async (req, res) => {
  const user_id = req.user.id;
  const { urls } = req.body;
  const _urls = urls.map((url) => {
    return {
      url: url.url,
      url_title: url.title,
      url_hashTags: url.hashtag,
      url_memo: url.memo,
      user_id,
    };
  });

  console.log("_urls: ", _urls[0]);
  try {
    await db.Urls.insertMany(_urls);
    res.send("items inserted");
  } catch (err) {
    console.log(err);
    res.send("items NOT inserted");
  }
};

const getLikeUrls = async (req, res) => {
  console.log("like url");
  const { id } = req.user;
  const user_id = id;
  //   console.log(id);
  //처음에는 딱 42개만 뽑아주고 이후에 무한스크롤
  const query = { url_likedUrl: 1, user_id };
  const likedUrls =
    (await db.Urls.find(query).sort({ url_updatedDate: -1 })) || [];
  await res.json({ totalUrls, likedUrls });
};

const getTotalUrls = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const query = { user_id };
  const likeQuery = { url_likedUrl: 1, user_id };

  const totalUrls = (await db.Urls.find(query).sort({ _id: -1 })) || [];

  const likedUrls =
    (await db.Urls.find(likeQuery).sort({ url_updatedDate: -1 })) || [];

  res.json({ totalUrls, likedUrls });
};

const updateUrlLike = async (req, res) => {
  const { id } = req.params;

  const update = (error, doc) => {
    doc.url_likedUrl === 1 ? (doc.url_likedUrl = 0) : (doc.url_likedUrl = 1);
    doc.url_updatedDate = getCurrentDate();
    doc.save();
    res.json(doc);
  };

  await db.Urls.findById(id, update).clone();
};

module.exports = {
  getLikeUrls,
  addUrl,
  addUrls,
  updateUrl,
  deleteUrls,
  getTotalUrls,
  updateUrlLike,
};
