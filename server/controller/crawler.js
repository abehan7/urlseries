const {
  launchBrowser,
  contents,
  gotoPage,
  dict,
  clickNextPage,
} = require("../hooks/crawler");
const db = require("../models");

const mongoose = require("mongoose");

const getDictionaryUrls = async (req, res) => {
  const { num } = req.params;
  const { url, resource } = req.body;
  const browser = await launchBrowser();
  const page = await gotoPage(browser, url);
  const resultUrls = [];

  // loop to get urls from dictionary
  // 1페이지 => 15개 url 추출
  for (let i = 0; i < num; i++) {
    console.log(i);
    let urls = await dict.getUrls(page);
    resultUrls.push(...urls);
    // click next page
    await clickNextPage(page, "#paginate strong + a");
  }

  // save to db
  await db.DictionaryUrls.create({
    dictionary_url_dummy: resultUrls,
    resource,
    start_url: url,
  });

  res.send("crawling done");
  //   close browser
  await browser.close();
  await browser.disconnect();
};

const fetchContents = async (req, res) => {
  const { id } = req.params;
  const _urls = await db.DictionaryUrls.find({ _id: id });
  const urls = _urls[0].dictionary_url_dummy;

  const browser = await launchBrowser();

  const url = urls[0];
  const page = await gotoPage(browser, url);
  const resultContents = [];

  // for (let i = 0; i < 3; i++) {
  for (let i = 0; i < urls.length; i++) {
    console.log(i);
    await page.goto(urls[i]);
    const url = urls[i];
    const title = await contents.getTitle(page);
    const memo = await contents.getMemo(page);
    const hashtags = await contents.getHashtags(page);

    resultContents.push({
      url,
      url_title: title,
      url_memo: memo,
      url_hashTags: hashtags,
    });
  }
  const query = { _id: "6221faf12dff2933bfdbc0dc" };
  const update = { $set: { url_contents: resultContents } };
  await db.DictionaryUrls.updateOne(query, update);
  await browser.close();
  await browser.disconnect();
  res.json(resultContents);
};

const fetchUrls = async (req, res) => {
  const _doc = await db.DictionaryUrls.find({
    _id: "6221faf12dff2933bfdbc0dc",
  });
  const doc = _doc[0].url_contents;

  const fn = async (url, index) => {
    const urlDoc = await new db.Urls({
      url_title: url.url_title,
      url: url.url,
      url_memo: url.url_memo,
      url_hashTags: url.url_hashTags,
      user_id: "6221ae82657b4859df4b2db2",
    });
    console.log(url.url_title);
    await urlDoc.save();
  };

  await doc.forEach(async (url, index) => await fn(url, index));
  res.send("done");
};

module.exports = {
  getDictionaryUrls,
  fetchContents,
  fetchUrls,
};
